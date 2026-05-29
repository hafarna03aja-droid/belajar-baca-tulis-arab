import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Auth: ambil user dari JWT
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { planType } = await req.json()
    if (!planType || !['monthly', 'yearly'].includes(planType)) {
      return new Response(JSON.stringify({ error: 'Invalid plan type' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const amount = planType === 'monthly' ? 29000 : 199000
    const orderId = `QURANFLOW-${user.id.slice(0, 8)}-${Date.now()}`

    // Buat transaksi Midtrans Snap
    const serverKey = Deno.env.get('MIDTRANS_SERVER_KEY') ?? ''
    const isProduction = Deno.env.get('MIDTRANS_IS_PRODUCTION') === 'true'
    const midtransUrl = isProduction
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

    const midtransResponse = await fetch(midtransUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(serverKey + ':')}`,
      },
      body: JSON.stringify({
        transaction_details: { order_id: orderId, gross_amount: amount },
        customer_details: { email: user.email },
        item_details: [{
          id: planType,
          price: amount,
          quantity: 1,
          name: planType === 'monthly' ? 'Qur\'an Flow Premium Bulanan' : 'Qur\'an Flow Premium Tahunan',
        }],
      }),
    })

    if (!midtransResponse.ok) {
      const err = await midtransResponse.text()
      console.error('Midtrans error:', err)
      return new Response(JSON.stringify({ error: 'Midtrans API error' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const snapData = await midtransResponse.json()

    // Simpan pending subscription di Supabase
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )
    await supabaseAdmin.from('subscriptions').upsert({
      user_id: user.id,
      plan_type: planType,
      status: 'pending',
      midtrans_order_id: orderId,
      gross_amount: amount,
    }, { onConflict: 'midtrans_order_id' })

    return new Response(JSON.stringify({ token: snapData.token, redirect_url: snapData.redirect_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
