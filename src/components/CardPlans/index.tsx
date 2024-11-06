'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface typePlans {
  tipePlan: string
  price: any
  state: boolean
  stateLink: boolean
  children: any
  idPlans?: string
  email?: string
  nameLink?: any
  disable?: boolean
  lists?: any[]
  handleclick?: any
  setPlan?: any
}

const CardPlan = ({
                    tipePlan,
                    price,
                    state,
                    children,
                    // idPlans,
                    stateLink,
                    // email,
                    // nameLink,
                    disable,
                    handleclick
                  }: // setPlan
                    typePlans) => {
  const router = useRouter()
  return (
    <>
      <div className={state ? 'box_plans-state' : 'box_plans'}>
        {state && (
          <span>{disable ? 'Indisponivel no momento!!!' : 'Mais popular'}</span>
        )}
        <p>{tipePlan}</p>
        <h3>
          ${price} {state && <b>/mes</b>}
        </h3>

        <ul>{children}</ul>

        {
          stateLink ? (
            <button
              onClick={() => handleclick({ price })}
            >
              Criar conta já
            </button>
          ) : (
            <button
              onClick={() => router.push('/LinkPersonalizado')}
            >
              Criar conta já
            </button>
          )
        }
      </div>
    </>
  )
}

export default CardPlan
