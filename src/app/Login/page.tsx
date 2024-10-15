'use client'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase'
import loginMagicLink from '@/utils/login'
import Link from 'next/link'
import NavBar from '@/components/Navbar/index'
import { MoveLeft } from 'lucide-react'
import ImageIconPage from '@/Images/image_pages.png'
import CardAlert from '@/components/components/cardAlert'
import { GetDataUser } from '@/utils/getInfoUser'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import Image from 'next/image'
// import { AltologinUser } from "@/utils/altoLogin";

const Index = () => {
  // const [user, loading, error]: any = useAuthState(auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  const handleEmail = async () => {
    try {
      const { User }: any = await GetDataUser(email)
      // await signIn('email', { email, redirect: false })
      console.log('User ==>', User)

      // && User.password === password
      if (User && User.email === email) {
        router.push(`/User/${User.nameLink}`)
        return setShowAlert(true)
      } else {
        return setShowAlert(true)
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
        {/* {loading ? (
          <p>Loading...</p>
        ) : ( */}
        <div className="container_login">
          <div className="card_login-info">
            <Link href="/">
              <MoveLeft />
            </Link>
            <form>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu E-Mail..."
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Password</label>
              <input
                id="password"
                type="text"
                placeholder="Digite sua Senha..."
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
              />
            </form>
            <button onClick={() => handleEmail()}>Login</button>
            {/* {showAlert && (
                <CardAlert
                  state={user}
                  open={true}
                  text={
                    user
                      ? 'Link Enviado ao seu email!🚀'
                      : 'Voce não possue conta com este email! Crie já sua conta no Simple Prifile🚀'
                  }
                />
              )} */}
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
