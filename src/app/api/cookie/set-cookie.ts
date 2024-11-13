// app/api/set-cookie/route.js

import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  cookieStore.set('token', 'meuToken', {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 3600 // Expira em 1 hora
  })

  return new Response(JSON.stringify({ message: 'Cookie adicionado com sucesso!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
