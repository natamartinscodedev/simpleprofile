'use client'

import React, { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import CardPlan from '@/components/CardPlans'
import SigningUp from '@/components/SigningUp/indx'

const Plans = ({ email, nameLink }) => {
  const [openSigningUp, setOpenSigningUp] = useState(false)
  const [plan, setPlan] = useState('')

  async function handleclick({ price }) {
    setOpenSigningUp(!openSigningUp)
    setPlan(price)
  }

  return (
    <>
      {openSigningUp === true ? (
        <SigningUp
          price={plan}
          email={email}
          nameLink={nameLink}
          // stateLink={stateLink}
        />
      ) : (
        <div className="container_plans">
          <CardPlan
            tipePlan="Simple"
            price={'Free'}
            state={false}
            idPlans="id_plans-free"
            email={email}
            nameLink={nameLink}
            // stateLink={false}
            handleclick={handleclick}
          >
            <li>
              <CircleCheck size={20} />
              Links
            </li>
            <li>
              <CircleCheck size={20} />
              Total de 6 card no plano Free
            </li>
          </CardPlan>
          <CardPlan
            tipePlan="Gold"
            price={'49,99'}
            state={true}
            idPlans="id_plans-gold"
            email={email}
            nameLink={nameLink}
            // disable={false}
            // stateLink={false}
            handleclick={handleclick}
          >
            <li>
              <CircleCheck size={20} />
              Imagens
            </li>
            <li>
              <CircleCheck size={20} />
              Videos
            </li>
            <li>
              <CircleCheck size={20} />
              Location
            </li>
            <li>
              <CircleCheck size={20} />
              Nota
            </li>
            <li>
              <CircleCheck size={20} />
              Links
            </li>
            <li>
              <CircleCheck size={20} />
              Infinit card!
            </li>
          </CardPlan>
        </div>
      )}
    </>
  )
}

export default Plans
