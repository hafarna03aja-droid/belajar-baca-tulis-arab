import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase admin client (service role)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PRICES = {
  monthly: 29000,   // Rp 29.000
  yearly: 199000,   // Rp 199.000
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { planType, userId, email, name } = body as {
      planType: 'monthly' | 'yearly'
      userId: string
      email: string
      name: string
    }

    if (!planType || !userId || !email) {
      return NextResponse.json(
        { error: 'planType, userId, dan email wajib diisi' },
        { status: 400 }
      )
    }

    if (!PRICES[planType]) {
      return NextResponse.json({ error: 'planType tidak valid' }, { status: 400 })
    }

    const grossAmount = PRICES[planType]
    const orderId = `QURANFLOW-${planType.toUpperCase()}-${userId.slice(0, 8)}-${Date.now()}`

    // Request token ke Midtrans
    const midtransUrl = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

    const midtransResponse = await fetch(midtransUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY! + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        customer_details: {
          first_name: name || 'Pengguna',
          email,
        },
        item_details: [
          {
            id: planType,
            price: grossAmount,
            quantity: 1,
            name: planType === 'monthly'
              ? 'Qur\'an Flow Premium — Bulanan'
              : 'Qur\'an Flow Premium — Tahunan',
            category: 'Edukasi',
          },
        ],
        callbacks: {
          finish: `${req.nextUrl.origin}/dashboard?payment=success`,
          error: `${req.nextUrl.origin}/pricing?payment=error`,
          pending: `${req.nextUrl.origin}/dashboard?payment=pending`,
        },
      }),
    })

    if (!midtransResponse.ok) {
      const errorData = await midtransResponse.json()
      console.error('Midtrans error:', errorData)
      return NextResponse.json(
        { error: 'Gagal membuat transaksi Midtrans', detail: errorData },
        { status: 500 }
      )
    }

    const { token: snapToken } = await midtransResponse.json()

    // Simpan transaksi pending ke Supabase
    await supabaseAdmin.from('transactions').insert({
      user_id: userId,
      order_id: orderId,
      gross_amount: grossAmount,
      transaction_status: 'pending',
    })

    // Simpan subscription pending
    await supabaseAdmin.from('subscriptions').upsert({
      user_id: userId,
      plan_type: planType,
      status: 'pending',
      midtrans_order_id: orderId,
      gross_amount: grossAmount,
    })

    return NextResponse.json({ snapToken, orderId })
  } catch (err) {
    console.error('Payment create error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
