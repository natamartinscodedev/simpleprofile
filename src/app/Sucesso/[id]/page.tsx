'use client'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import Link from 'next/link'
import { useEffect } from 'react'

const SucessoPayment = ({ params }: any) => {
  const nameUser: any = window.localStorage.getItem('nameUser')
  const checkoutPaymente = params.id

  useEffect(() => {
    if (checkoutPaymente === 'true') {
      UpdateInfoUser({ plans: 'Gold', nameLink: nameUser })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="container_sucesso container">
        <h2>
          {checkoutPaymente === 'true'
            ? 'Assinatura realizado com sucesso!🥳'
            : 'Falha no pagamento.'}
        </h2>
        <div className="box_sucesso-info">
          {checkoutPaymente === 'true' ? (
            <>
              <h3>
                Bem vindo ao plano Gold, agora você tem acesso total ao
                SimpleProfile
              </h3>
              <p>Ei {nameUser}, monte seu super perfil da melhor forma.</p>
              <h3>🚀🚀🚀</h3>
              <Link href="/Login" target="__blanck">
                Login
              </Link>
            </>
          ) : (
            <>
              <p>Tente novamente, pois seu pagamento não foi realizado</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SucessoPayment
