'use client'

import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

export default function BuyButton({ nameId, price, handleSubmit }: any) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  async function handleClick(testeId: string, assinatura: boolean) {
    try {
      setIsCreatingCheckout(true)

      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assinatura, testeId, nameId, priceId: price })
      })

      const stripeClient = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
      )

      if (!stripeClient) throw new Error('Stripe failed to initialize.')

      const { sessionId, ok } = await checkoutResponse.json()
      if (ok === 'true') {
        handleSubmit()
      }

      await stripeClient.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error(error)
    } finally {
      setIsCreatingCheckout(false)
    }
  }

  return (
    <button
      disabled={isCreatingCheckout}
      className="button_stroe-payment"
      onClick={() => handleClick('price_golde', true)}
    >
      Assinar
    </button>
  )
}
