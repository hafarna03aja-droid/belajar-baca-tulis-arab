import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { order_id, status_code, gross_amount, signature_key } = body

    // Verifikasi signature dari Midtrans
    const serverKey = Deno.env.get('MIDTRANS_SERVER_KEY') ?? ''
    const expectedSignature = await sha512(`${order_id}${status_code}${gross_amount}${serverKey}`)

    if (signature_key !== expectedSignature) {
      console.error('Invalid signature!')
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const transactionStatus = body.transaction_status
    const fraudStatus = body.fraud_status

    // Tentukan status final
    let finalStatus: 'active' | 'failed' | 'pending' = 'pending'
    if (transactionStatus === 'capture') {
      finalStatus = fraudStatus === 'accept' ? 'active' : 'failed'
    } else if (transactionStatus === 'settlement') {
      finalStatus = 'active'
    } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
      finalStatus = 'failed'
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Ambil subscription terkait order ini
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('midtrans_order_id', order_id)
      .single()

    if (subscription) {
      const now = new Date()
      const endDate = new Date(now)
      if (subscription.plan_type === 'monthly') endDate.setMonth(endDate.getMonth() + 1)
      else endDate.setFullYear(endDate.getFullYear() + 1)

      await supabase.from('subscriptions').update({
        status: finalStatus,
        start_date: finalStatus === 'active' ? now.toISOString() : null,
        end_date: finalStatus === 'active' ? endDate.toISOString() : null,
        updated_at: now.toISOString(),
      }).eq('midtrans_order_id', order_id)

      // Simpan ke tabel transactions
      await supabase.from('transactions').upsert({
        user_id: subscription.user_id,
        order_id,
        gross_amount: parseInt(gross_amount),
        payment_type: body.payment_type,
        transaction_status: transactionStatus,
        fraud_status: fraudStatus,
        midtrans_transaction_id: body.transaction_id,
      }, { onConflict: 'order_id' })
    }

    return new Response(JSON.stringify({ message: 'OK' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

// Helper: SHA512 hash
async function sha512(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
