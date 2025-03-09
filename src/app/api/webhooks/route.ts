// app/api/checkout/route.js

import stripe from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { UpdateInfoUser } from '@/utils/updateInfoUser' // Função que atualiza o banco de dados

const secret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = (await headers()).get('stripe-signature')

    if (!secret || !signature) {
      throw new Error('Missing secret or signature')
    }

    const event: any = stripe.webhooks.constructEvent(body, signature, secret)
    // Exemplo: extraia um userId enviado via metadata (ajuste conforme sua implementação)
    const userId: any = event.data.object.metadata?.userId

    switch (event.type) {
      case 'checkout.session.completed': {
        if (event.data.object.payment_status === 'paid') {
          // Pagamento com cartão concluído para o produto mensal
          // Se houver uma flag no metadata indicando mudança de plano, atualize o usuário
          const testeId = event.data.object.metadata?.testeId;

          return NextResponse.json(
            { message: 'Subscription added', ok: true },
            { status: 200 }
          )
        }
        if (
          event.data.object.payment_status === "unpaid" &&
          event.data.object.payment_intent
        ) {
          // Pagamento por boleto
          const paymentIntent = await stripe.paymentIntents.retrieve(
            event.data.object.payment_intent.toString()
          );

          const hostedVoucherUrl =
            paymentIntent.next_action?.boleto_display_details
              ?.hosted_voucher_url;

          if (hostedVoucherUrl) {
            // O cliente gerou um boleto, manda um email pra ele
            const userEmail = event.data.object.customer_details?.email;
            console.log("gerou o boleto e o link é", hostedVoucherUrl);
          }
        }
        break;
      }

      case "checkout.session.expired":
        if (event.data.object.payment_status === "unpaid") {
          // O cliente saiu do checkout e expirou :(
          const testeId = event.data.object.metadata?.testeId;
          console.log("checkout expirado", testeId);
        }
        break;

      case "checkout.session.async_payment_succeeded":
        if (event.data.object.payment_status === "paid") {
          // O cliente pagou o boleto e o pagamento foi confirmado
          const testeId = event.data.object.metadata?.testeId;
          console.log("pagamento boleto confirmado", testeId);
        }
        break;

      case "checkout.session.async_payment_failed":
        if (event.data.object.payment_status === "unpaid") {
          // O cliente não pagou o boleto e ele venceu :(
          const testeId = event.data.object.metadata?.testeId;
          console.log("pagamento boleto falhou", testeId);
        }
        break;

      case "customer.subscription.deleted":
        // O cliente cancelou o plano :(
        break;
    }

    return NextResponse.json({ result: event, ok: true }, { status: 200 })

  } catch (error: any) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { message: `Webhook error: ${error.message}`, ok: false },
      { status: 500 }
    )
  }
}
