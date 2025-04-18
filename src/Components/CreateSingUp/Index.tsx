'use client'

import React, { useEffect, useState } from 'react'
import { checkEmailAvailability } from '@/utils/verificEmail'
import Image from 'next/image'
import ImageIconPage from '../../../public/Images/image_pages.png'
import Plans from '@/app/Plans/index'
import { Mail, MoveLeft } from 'lucide-react'
// import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { GetDataUser } from '@/utils/getInfoUser'
// import { Sonsie_One } from 'next/font/google'

interface TypeProps {
  changeState: any
  nameLink: string
}

const Index = ({ changeState, nameLink }: TypeProps) => {
  const { data: session }: any = useSession()
  const [email, setEmail] = useState<string | ''>('')
  const [openPlan, setOpenPlan] = useState(false)

  function createUserPlan() {
    setOpenPlan(true)
  }

  async function createUserPlanAuth() {
    const EmailAuth = session?.user
    const { User }: any = await GetDataUser(EmailAuth?.email)

    if (EmailAuth?.email && User) {
      setEmail(EmailAuth?.email)
      setOpenPlan(true)
    }
  }

  useEffect(() => {
    createUserPlanAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const backPage = (e: any) => {
    e.preventDefault()
    changeState(!!false)
  }

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        try {
          await checkEmailAvailability({ email })
        } catch (err) {
          return
        }
      }
    }
    checkEmail()
  }, [email])

  return (
    <>
      {/* Apos preencher as informações, eu seto o state como openPlan=true para redirecionar para a pg de escolher planos  */}
      {openPlan ? (
        <div className="card_plans-change container">
          <button
            onClick={() => setOpenPlan(false)}
            className="card_plans-change-btn-back"
          >
            <MoveLeft />
          </button>

          {/* Card Plans */}
          <Plans email={email} nameLink={nameLink} />
        </div>
      ) : (
        // Page SingUp
        <div className="container_sing-up container ">
          <div className="container_sing-up-info">
            <div className="box_info">
              <button onClick={backPage}>
                {' '}
                <MoveLeft />
              </button>
              <p>
                sipeprofile/<span>{nameLink}</span> it's yu!
              </p>
              <h2>Now, create your account.</h2>
              <h4>Create your professional profile now.</h4>
              <b>
                Create your account quickly, just enter your email to
                register!
              </b>
            </div>
            <form className="box_input-form"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              {/* add zood for validation in all forms*/}
              <div>
                <span>
                  <Mail />
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  placeholder="Digite seu email."
                />
              </div>

              <button onClick={() => createUserPlan()}>Escolher Plano</button>
              {/* <p> ------------ OR ------------ </p> */}
              {/* <p>Cirar com:</p> */}

              {/*<div className="box_input-form-buttons">*/}
              {/*  <button onClick={() => signIn('google')}>Google</button>*/}
              {/*  <button onClick={() => signIn('github')}>Github</button>*/}
              {/*</div>*/}
            </form>
          </div>
          <div
            className="container_sing-up-image"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <Image src={ImageIconPage} alt="" />
          </div>
        </div>
      )}
    </>
  )
}

export default Index
