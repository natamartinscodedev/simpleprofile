'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import bcrypt from 'bcrypt';
import { FetchPost } from '@/utils/createUser'
import { useSession, signIn } from 'next-auth/react'
import BuyButton from '@/components/button-stripe-payment'
import { GetDataUser } from '@/utils/getInfoUser'
import Image from 'next/image'
import ImageIconPage from '../../../public/Images/image_pages.png'

interface typeItems {
  price: any
  email: any
  nameLink: string
}

const SigningUp = ({ email, price, nameLink }: typeItems) => {
  const { data: session }: any = useSession()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [passwordCript, setPasswordCripto] = useState('')

  const handleCriptPassword = async (e:any) => {
    setPassword(e)

    // const saltRounds = 15;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    //
    // setPasswordCripto(hashedPassword)
  }

  const handleSubmit = async () => {
    if (password && email) {
      try {
        await FetchPost({
          nameLink,
          email,
          password: passwordCript,
          plans: price,
          name: '',
          bio: '',
          image: '',
          lists: []
        })

        window.localStorage.setItem('emailForSignIn', email)
        window.localStorage.setItem('sharedProfile', 'true')
        alert(
          `Criado com sucesso🤠 ${nameLink}! Monte seu perfil já!..🚀`
        )
        router.push(`/${nameLink}`)
      } catch (err) {
        console.error('Erro ao enviar o link de autenticação:', err)
      }
    }
  }

  // const loginAuth = async () => {
  //   const EmailAuth = session?.user
  //   const { User }: any = await GetDataUser(EmailAuth?.email)
  //
  //   if (EmailAuth?.email && User) {
  //     try {
  //       await FetchPost({
  //         nameLink,
  //         email: session.user.email,
  //         password: password,
  //         plans: price,
  //         name: '',
  //         bio: '',
  //         image: '',
  //         lists: []
  //       })
  //
  //       window.localStorage.setItem('emailForSignIn', session.user.email)
  //       window.localStorage.setItem('sharedProfile', 'true')
  //
  //       return router.push(`/${User.nameLink}`)
  //     } catch (err) {
  //       alert(
  //         'O email desta conta, não está cadastrado em nosso banco de dados! Crie uma conta já!'
  //       )
  //       return router.push(`/LinkPersonalize`)
  //     }
  //   }
  // }
  //
  // useEffect(() => {
  //   loginAuth()
  // }, [session])

  return (
    <div className="container_password-card">
      <div className="container_password">
        <h2>Crie uma super senha de segurança!</h2>

        <div className="form_password">
          <label htmlFor="email">Password</label>
          <input
            type="text"
            placeholder="Password..."
            value={password}
            onChange={(e: any) => handleCriptPassword(e.target.value)}
          />
        </div>
        <>
          {price === 'Free' ? (
            <button onClick={() => handleSubmit()}>Cadastrar</button>
          ) : (
            <BuyButton nameId={nameLink} price={price} handleSubmit={handleSubmit} />
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
