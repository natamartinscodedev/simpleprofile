'use client'

import { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    try {
      if (email) {
        const res = await fetch('/api/reset password/forgot', {
          cache: 'no-cache',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        })
        const data = await res.json()

        window.localStorage.setItem('emailForSignIn', email)
        setMessage(data.success ? 'Link enviado para seu Email!.' : 'Erro ao enviar o link.')
      }
    } catch (error) {
      setMessage('Erro no servidor.')
    }
  }

  return (
    <div className="container_forgot-password container">
      <h2>Esqueceu sua senha?</h2>
      <div className="box_form-forgot-password">
        <input
          type="email"
          placeholder="Digite seu email para redefinir sua senha..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={(e: any) => handleSubmit()}>Redefinir senha</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ForgotPassword
