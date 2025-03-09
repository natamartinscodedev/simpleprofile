import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/Styles/style.scss'
import { Roboto } from 'next/font/google'
import Provider from '@/Components/Provider'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '../../wagmi.config'
import { GoogleAds } from '@/Components/GoogleAds/inde';

export const metadata: Metadata = {
  title: 'Simple Profile',
  description: 'Create you simple profile and shared with same people...'
}

const roboto = Roboto({
  weight: '500'
})

export default async function LocaleLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(
    config(),
    (await headers()).get('cookie')
  )

  return (
    <html lang="pt-BR">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3446067000341217"
          crossorigin="anonymous"></script>
      </head>
      <body className={roboto.className}>
        <Provider initialState={initialState}>{children}</Provider>
        <GoogleAnalytics gaId="G-YNMV86RLSQ" />
        <GoogleAds />
      </body>
    </html>
  )
}

