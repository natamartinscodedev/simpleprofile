import stripe from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { testeId, assinatura, } = await req.json();
  // Defina o ID de preço com base no tipo de transação
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID
          ,
          quantity: 1,
        },
      ],
      mode: assinatura === true && 'subscription',
      payment_method_types: assinatura && ['card'],
      success_url: `${req.headers.get('origin')}/Sucesso/${assinatura}`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata: {
        testeId,
      },
    });

    return NextResponse.json({ sessionId: session.id, ok: true });
    // return NextResponse.json({ sessionId: 'foi', ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
