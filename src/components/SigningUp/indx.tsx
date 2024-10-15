'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FetchPost } from '@/utils/createUser'

interface typeItems {
  price: any
  email: any
  nameLink: string
  //   stateLink: any
}

const SigningUp = ({ email, price, nameLink }: typeItems) => {
  const router = useRouter()
  const [password, setPasswor] = useState('')

  const handleSubmit = async () => {
    // if (stateLink === true) {
    //   router.push('/Login')
    // }

    try {
      if (email) {
        // create user in mongoDB and firebase
        await FetchPost({
          nameLink,
          email,
          password,
          plans: price,
          name: 'Seu nome...',
          bio: 'sua bio...',
          image: '',
          lists: []
        })
        window.localStorage.setItem('emailForSignIn', email)

        alert(
          `Criado com sucesso🤠 ${nameLink}! Monte seu perfil da forma ideal!..🚀`
        )
        router.push(`/User/${nameLink}`)
      }
    } catch (err) {
      console.error('Erro ao enviar o link de autenticação:', err)
    }
  }

  return (
    <>
      <div className="container_password">
        <h2>Crie uma super senha de segurança!</h2>

        <label htmlFor="email">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="passwoed123"
          required
          value={password}
          onChange={(e: any) => setPasswor(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>Cadastrar</button>

        <div>login auth google and github</div>
      </div>
    </>
  )
}

export default SigningUp
