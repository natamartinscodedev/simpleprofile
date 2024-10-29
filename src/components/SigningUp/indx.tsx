'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FetchPost } from '@/utils/createUser'
import { useSession, signIn } from 'next-auth/react'
import BuyButton from '@/components/button-stripe-payment'

interface typeItems {
  price: any
  email: any
  nameLink: string
}

const SigningUp = ({ email, price, nameLink }: typeItems) => {
  const { data: session }: any = useSession()
  const router = useRouter()
  const [password, setPasswor] = useState('')

  const handleSubmit = async () => {
    if (password && email) {
      try {
        await FetchPost({
          nameLink,
          email,
          password: password,
          plans: price,
          name: '',
          bio: '',
          image: '',
          lists: []
        })

        window.localStorage.setItem('emailForSignIn', email)
        alert(
          `Criado com sucesso🤠 ${nameLink}! Monte seu perfil da forma ideal!..🚀`
        )
        router.push(`/${nameLink}`)
      } catch (err) {
        console.error('Erro ao enviar o link de autenticação:', err)
      }
    }
  }

  return (
    <>
      <div className="container_password">
        <h2>Crie uma super senha de segurança!</h2>

        <div className="form_password">
          <label htmlFor="email">Password</label>
          <input
            type="text"
            placeholder="Password..."
            value={password}
            onChange={(e: any) => setPasswor(e.target.value)}
          />
        </div>
        <>
          {price === 'Free' ? (
            <button onClick={() => handleSubmit()}>Cadastrar</button>
          ) : (
            <BuyButton nameId={nameLink} price={price} handleSubmit={handleSubmit} />
          )}
        </>

        <div>
          <p>Cirar com:</p>
          <button onClick={() => signIn('google')}>Google</button>
          <button onClick={() => signIn('github')}>Github</button>
        </div>
      </div>
    </>
  )
}

export default SigningUp
