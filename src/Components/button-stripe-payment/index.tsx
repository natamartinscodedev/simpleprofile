'use client'

import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

export default function BuyButton({ nameId, price, handleCreareUser }: any) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  async function handleClick(testeId: string, assinatura: boolean) {
    setIsCreatingCheckout(true)

    if (process.env.NEXT_PUBLIC_STRIPE_PUB_KEY === undefined) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUB_KEY is not defined!')
    }

    const stripeClient = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
    )

    try {
      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assinatura, testeId, nameId, priceId: price })
      })

      const stripeClient = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
      );

      if (!stripeClient) throw new Error('Stripe failed to initialize.')

      const { sessionId } = await checkoutResponse.json();

      if (assinatura === true && testeId === 'price_gold') {
        handleCreareUser()
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
      onClick={() => handleClick('price_gold', true)}
    >
      to sign Gold!
    </button>
  )
}
