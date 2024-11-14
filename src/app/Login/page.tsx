'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { compare } from 'bcryptjs'
import Image from 'next/image'
import { EyeOff, Eye, MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useSession, signIn } from 'next-auth/react'
import NavBar from '@/components/Navbar/index'
import ImageIconPage from '../../../public/Images/image_pages.png'
import { GetDataUser } from '@/utils/getInfoUser'

const Index = () => {
  const { data: session }: any = useSession()
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCripto, setPasswordCripto] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleCript = async () => {
    try {
      const { User }: any = await GetDataUser({ email })
      const isPasswordCorrect: any = await compare(password, User.password)

      if (User) {
        setPasswordCripto(isPasswordCorrect)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleCript()
  }, [password])

  const handleLogin = async () => {
    try {
      const { User }: any = await GetDataUser({ email })
      if (User.email === email && passwordCripto) {

        window.localStorage.setItem('emailForSignIn', email)
        window.localStorage.setItem('sharedProfile', 'true')
        setShowAlert(true)

        return router.push(`/${User.nameLink}`)
      } else {
        setError(true)
        setShowAlert(false)
      }
    } catch (err) {
      console.log('ERR ==>', err)
    }
  }

  // const loginAuth = async () => {
  //   try {
  //     const EmailAuth = session?.user
  //     const { User }: any = await GetDataUser(EmailAuth?.email)
  //     if (EmailAuth?.email === User.email) {
  //       window.localStorage.setItem('emailForSignIn', session.user.email)
  //       window.localStorage.setItem('sharedProfile', 'true')
  //
  //       return router.push(`/${User.nameLink}`)
  //     } else {
  //       alert(
  //         'O email desta conta, não está cadastrado em nosso banco de dados! Crie uma conta já!'
  //       )
  //
  //       return router.push(`/LinkPersonalize`)
  //     }
  //   } catch (err) {
  //     console.log('Err ==>', err)
  //   }
  // }
  //
  // useEffect(() => {
  //   loginAuth()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session])
  const handleResetPasswprd = () => {

  }

  return (
    <>
      <NavBar state={false} />
      <div className="card_login container">
        <div className="container_login">
          <div className="card_login-info">
            <Link href="/">
              <MoveLeft />
            </Link>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="card_form-login"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Digite seu E-Mail..."
                  value={email}
                  {...register('email')}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Password</label>
                <div className="box_input-password-login">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua Senha..."
                    value={password}
                    {...register('password')}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{ marginLeft: '10px' }}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <div className="box_forgot-password">
                  {error && (<p style={{ color: 'red' }}>Senha incorreta!</p>)}
                  {error && (<Link href="/ForgotPassword">Redefinir senha!</Link>)}
                </div>
              </div>
              <button type="submit">
                {showAlert ? 'Carregando...' : 'Entrar'}
              </button>
            </form>
          </div>
          <div
            className="card_img-login"
            data-aos="fade-left"
            data-aos-duration="1000">
            <Image src={ImageIconPage} width={400} alt="logo login" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
