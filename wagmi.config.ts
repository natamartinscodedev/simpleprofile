import { createConfig, http, cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId: any = process.env.NEXT_PUBLIC_PROJECT_ID

export function config() {
  return createConfig({
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage
    }),
    connectors: [walletConnect({ projectId }), metaMask(), ],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http()
    }
  })
}
