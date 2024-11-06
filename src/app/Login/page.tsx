'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, MoveLeft } from 'lucide-react'
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
  const [showAlert, setShowAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleEmail = async () => {
    try {
      const { User }: any = await GetDataUser(email)
      if (User.email === email && User.password === password) {
        window.localStorage.setItem('emailForSignIn', email)
        window.localStorage.setItem('sharedProfile', 'true')

        setShowAlert(true)

        return router.push(`/${User.nameLink}`)
      } else {
        return setShowAlert(false)
      }
    } catch (err) {
      console.log('ERR ==>', err)
    }
  }

  const loginAuth = async () => {
    try {
      const EmailAuth = session?.user
      const { User }: any = await GetDataUser(EmailAuth?.email)
      if (EmailAuth?.email === User.email) {
        window.localStorage.setItem('emailForSignIn', session.user.email)
        window.localStorage.setItem('sharedProfile', 'true')

        return router.push(`/${User.nameLink}`)
      } else {
        alert(
          'O email desta conta, não está cadastrado em nosso banco de dados! Crie uma conta já!'
        )

        return router.push(`/LinkPersonalize`)
      }
    } catch (err) {
      console.log('Err ==>', err)
    }
  }

  useEffect(() => {
    loginAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

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
              onSubmit={handleSubmit(handleEmail)}
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
                <input
                  type="password"
                  placeholder="Digite sua Senha..."
                  value={password}
                  {...register('password')}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                {/*<button*/}
                {/*  type="button"*/}
                {/*  onClick={togglePasswordVisibility}*/}
                {/*  style={{ marginLeft: '10px' }}*/}
                {/*>*/}
                {/*  {showPassword ? <EyeOff/> : <Eye/>}*/}
                {/*</button>*/}
              </div>
              <button type="submit">
                {showAlert ? 'Carregando...' : 'Entrar'}
              </button>
            </form>
            <p>----------------- or -----------------</p>
            <div className="card_login-btn-login">
              <button onClick={() => signIn('google')} disabled={false}>Google</button>
              <button onClick={() => signIn('github')} disabled={false}>Github</button>
            </div>
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
