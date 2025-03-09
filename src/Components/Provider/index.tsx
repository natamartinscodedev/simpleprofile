'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider, useAccount } from 'wagmi'
import { config } from '../../../wagmi.config'

const Provider = ({
  children,
  initialState
}: Readonly<{
  children: React.ReactNode
  initialState: State | undefined
}>) => {
  const queryClient = new QueryClient()

  return (
    <>
      <WagmiProvider config={config()} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default Provider
