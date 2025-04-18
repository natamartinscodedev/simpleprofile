'use client'

import React, { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import CardPlan from '@/Components/CardPlans'
import SigningUp from '@/Components/SigningUp/indx'

// Aqui, validamos o plano e a criação do novo usuario planos Gold
const Plans = ({ email, nameLink }) => {
  const [openSigningUp, setOpenSigningUp] = useState(false)
  const [plan, setPlan] = useState('')
  const [idPlan, setIdPlan] = useState('')

  async function handleclick({ price, idPlans }) {
    setOpenSigningUp(!openSigningUp)
    setPlan(price)
    setIdPlan(idPlans)
  }

  return (
    <>
      {/* se o plano for escolhido, mando para a pg de criação SingningUP */}
      {openSigningUp === true ? (
        <SigningUp
          price={plan}
          email={email}
          nameLink={nameLink}
          idPlans={idPlan}
        />
      ) : (
        <div
          className="container_plans"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <CardPlan
            tipePlan="Free"
            price={"Free"}
            state={true}
            idPlans="id_plans-gold"
            email={email}
            nameLink={nameLink}
            disable={false}
            stateLink={true}
            // Mandei a função para ser ativa dentro do CardPlan
            handleclick={handleclick}
          >
            {/* <li>
              <CircleCheck size={20} />
              Access all the Sass
            </li>
            <li>
              <CircleCheck size={20} />
              Links
            </li> */}
          </CardPlan>
        </div>
      )}
    </>
  )
}

export default Plans
