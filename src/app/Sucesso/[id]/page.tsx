'use client'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import Link from 'next/link'
import { useEffect } from 'react'

const SucessoPayment = ({ params }: any) => {
  const checkoutPaymente = "Free"

  // useEffect(() => {
  //   if (checkoutPaymente === 'Free') {
  //     UpdateInfoUser({ plans: 'Gold', nameLink: nameUser })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      <div className="container_sucesso container">
        <h2>
          {checkoutPaymente === 'Free'
            ? 'Conta criada com sucesso!🥳'
            : 'Falha na criação da conta.'}
        </h2>
        <div className="box_sucesso-info">
          {checkoutPaymente === 'Free' ? (
            <>
              <h3>
                Bem vindo ao SimpeProfile, agora você tem acesso a melhor plataforma
                para construir seu perfil como você quiser.
              </h3>
              <p>Monte seu super perfil da melhor forma.</p>
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
