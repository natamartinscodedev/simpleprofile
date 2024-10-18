'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import NavBar from '@/components/Navbar/index'
import ImageIconPage from '@/Images/image_pages.png'
import { GetDataUser } from '@/utils/getInfoUser'

const Index = () => {
  const { register, handleSubmit } = useForm()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  const handleEmail = async () => {
    try {
      const { User }: any = await GetDataUser(email)
      // && User.password === password
      if (
        email &&
        password &&
        User &&
        User.email === email &&
        User.password === password
      ) {
        window.localStorage.setItem('emailForSignIn', email)
        setShowAlert(true)
        return router.push(`/User/${User.nameLink}`)
      } else {
        return setShowAlert(false)
      }
    } catch (err) {
      console.log('ERR ==>', err)
    }
  }

  useEffect(() => {
    // try login altomatic if true keys
    // AltologinUser(router);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NavBar state={false} />
      <div className="card_login container">
        <div className="container_login">
          <div className="card_login-info">
            <Link href="/">
              <MoveLeft />
            </Link>
            <form onSubmit={handleSubmit(handleEmail)}>
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
                  type="text"
                  placeholder="Digite sua Senha..."
                  value={password}
                  {...register('password')}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">
                {showAlert ? 'Carregando...' : 'Entrar'}
              </button>
            </form>
          </div>
          <div className="card_img-login">
            <Image src={ImageIconPage} width={400} alt="logo login" />
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  )
}

export default Index
