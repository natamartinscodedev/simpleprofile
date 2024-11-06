import type { Metadata } from 'next'
import Head from 'next/head'
import '@/Styles/style.scss'
import { Roboto } from 'next/font/google'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: 'Simple Profile',
  description: 'Create ypu simple profile and shared with same people...'
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500'
})

export default async function LocaleLayout({
                                             children
                                           }: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
    <head>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3446067000341217"
        crossOrigin="anonymous"></script>
    </head>
    <body className={roboto.className}>
    <Provider>{children}</Provider>
    </body>
    </html>
  )
}
