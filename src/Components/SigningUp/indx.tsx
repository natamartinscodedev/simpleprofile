'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { hash } from 'bcryptjs'
import { FetchPost } from '@/utils/createUser'
// import BuyButton from '@/Components/button-stripe-payment'
// import { GetDataUser } from '@/utils/getInfoUser'
import Image from 'next/image'
import ImageIconPage from '../../../public/Images/image_pages.png'

interface typeItems {
  price: any
  email: any
  nameLink: string,
  idPlans: string,
}

const SigningUp = ({ email, price, nameLink, idPlans }: typeItems) => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [passwordCript, setPasswordCripto] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCriptPassword = async (e: any) => {
    setPassword(e)

    const saltRounds = 10
    const hashedPassword = await hash(password, saltRounds)
    setPasswordCripto(hashedPassword)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (password && email) {
        const res = await FetchPost({
          nameLink,
          email,
          password: passwordCript,
          plans: idPlans,
          name: '',
          bio: '',
          image: '',
          lists: []
        })

        window.localStorage.setItem('emailForSignIn', email)
        window.localStorage.setItem('sharedProfile', 'true')

        if (res.status === 200) {
          console.log('User created successfully', idPlans)
        }

        return router.push(`/Sucesso/${'Free'}`)
      }

      setLoading(false)
    } catch (err) {
      console.error('Erro ao enviar o link de autenticação:', err)
    }
  }

  return (
    <div className="container_password-card">
      <div className="container_password">
        <h2>Crie sua senha de segurança!</h2>

        <div className="form_password">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e: any) => handleCriptPassword(e.target.value)}
          />
        </div>
        <>
          {idPlans === 'id_plans-gold' && (
            // <BuyButton
            //   nameId={nameLink}
            //   price={price}
            //   handleCreareUser={handleSubmit}
            // />
            <button onClick={handleSubmit}>{loading ? 'Carregando...' : 'Criar'}</button>
          )}
        </>
      </div>
      <div
        className="container_sing-up-image"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <Image src={ImageIconPage} alt="" />
      </div>
    </div>
  )
}

export default SigningUp
