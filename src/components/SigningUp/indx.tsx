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
        router.push(`/User/${nameLink}`)
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

        <button onClick={() => handleSubmit()}>Cadastrar</button>

        <div>login auth google and github</div>
      </div>
    </>
  )
}

export default SigningUp
