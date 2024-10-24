"use client"

import Link from 'next/link'
import React from 'react'

const SucessoPayment = () => {
  return (
    <>
      <div className="container_sucesso container">
        <h2>Assinatura realizado com sucesso!🥳</h2>
        <div className="box_sucesso-info">
          <p>Agora, faça login e monte seu super perfil.</p>
          <h3>🚀🚀🚀</h3>
          <Link href="/Login" target="__blanck">
            Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default SucessoPayment
