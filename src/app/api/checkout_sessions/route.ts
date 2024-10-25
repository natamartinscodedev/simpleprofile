import stripe from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { testeId, assinatura, nameId, priceId } = await req.json()
  // const date = [{testeId}, {assinatura}]

  const price = assinatura
    ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID
    : process.env.STRIPE_PRICE_ID

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1
        }
      ],
      mode: assinatura ? 'subscription' : 'payment',
      payment_method_types: assinatura ? ['card'] : ['card', 'boleto'],
      success_url: `${req.headers.get(
        'origin'
      )}/Sucesso/${assinatura}?plan=${priceId}?nameId=${nameId}`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata: {
        testeId
      }
    })

    return NextResponse.json({ sessionId: session.id, ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}
