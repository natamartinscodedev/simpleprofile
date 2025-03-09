'use client'

import Image from 'next/image'
import * as React from 'react'
import { useConnect } from 'wagmi'
import LogoMetaMask from '../../../public/Images/MetaMask.png'
import Wallet from '../../../public/Images/wallet.png'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map(connector => (
    <button
      key={connector.uid}
      className="wallet"
      // className={`${connector.name !== 'MetaMask' ? 'wallet' : 'metawallet'}`}
      onClick={() => connect({ connector })}
    >
      {connector.name === 'MetaMask' ? (
        <Image className="Logo_Meta_Wallet" src={LogoMetaMask} alt="" />
      ) : (
        <Image className="Logo_Meta_Wallet" src={Wallet} alt="" />
      )}
    </button>
  ))
}
