import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// Supabase admin client (service role — bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
      transaction_id,
    } = body

    // ✅ Verifikasi signature hash (WAJIB untuk keamanan)
    // Format: SHA512(order_id + status_code + gross_amount + server_key)
    const serverKey = process.env.MIDTRANS_SERVER_KEY!
    const expectedSignature = createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex')

    if (signature_key !== expectedSignature) {
      console.error('Invalid Midtrans signature for order:', order_id)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    // Update tabel transactions
    await supabaseAdmin.from('transactions').upsert({
      order_id,
      gross_amount: parseInt(gross_amount),
      payment_type,
      transaction_status,
      fraud_status,
      midtrans_transaction_id: transaction_id,
    })

    // Cek apakah pembayaran berhasil
    const isSuccess =
      transaction_status === 'capture' ||
      transaction_status === 'settlement'

    const isFailed =
      transaction_status === 'deny' ||
      transaction_status === 'cancel' ||
      transaction_status === 'expire' ||
      transaction_status === 'failure'

    if (isSuccess && (fraud_status === 'accept' || !fraud_status)) {
      // Ambil data subscription dari order_id
      const { data: subscription } = await supabaseAdmin
        .from('subscriptions')
        .select('user_id, plan_type')
        .eq('midtrans_order_id', order_id)
        .single()

      if (subscription) {
        const now = new Date()
        const endDate = new Date(now)

        // Hitung masa aktif berdasarkan plan
        if (subscription.plan_type === 'monthly') {
          endDate.setMonth(endDate.getMonth() + 1)
        } else if (subscription.plan_type === 'yearly') {
          endDate.setFullYear(endDate.getFullYear() + 1)
        }

        // Update subscription ke ACTIVE
        await supabaseAdmin.from('subscriptions').update({
          status: 'active',
          start_date: now.toISOString(),
          end_date: endDate.toISOString(),
          updated_at: now.toISOString(),
        }).eq('midtrans_order_id', order_id)

        console.log(`✅ Subscription activated for user: ${subscription.user_id}, until: ${endDate.toISOString()}`)
      }
    } else if (isFailed) {
      // Update subscription ke FAILED
      await supabaseAdmin.from('subscriptions').update({
        status: 'failed',
        updated_at: new Date().toISOString(),
      }).eq('midtrans_order_id', order_id)

      console.log(`❌ Payment failed for order: ${order_id}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
