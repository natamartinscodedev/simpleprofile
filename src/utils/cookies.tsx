'use server'

import { cookies } from 'next/headers'

export async function createCookiesProfile(data: any) {
  const cookieStore = cookies()

  cookieStore.set({
    name: 'shared_profile',
    value: JSON.stringify(data), // Serializa o valor em JSON se for um objeto
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 // Expira em 1 dia
  })
}
