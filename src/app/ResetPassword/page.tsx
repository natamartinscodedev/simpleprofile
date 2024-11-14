'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import { GetDataUser } from '@/utils/getInfoUser'
import { hash } from 'bcryptjs'

const Index = () => {
  const emailUser: any = window.localStorage.getItem('emailForSignIn')
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [changePassword, setChangePassword] = useState('')

  const UserData = async () => {
    if (emailUser) {
      const User: any = await GetDataUser({ email: emailUser })
      const { nameLink } = User.User

      setChangePassword(nameLink)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.')
    }

    const saltRounds = 8
    const hashedPassword: any = await hash(password, saltRounds)

    UpdateInfoUser({ password: hashedPassword, nameLink: changePassword })
    router.push('/Login')
  }

  useEffect(() => {
    UserData()
  }, [password])

  return (
    <div className="container_reset-password container">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nova senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a nova senha..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Index
