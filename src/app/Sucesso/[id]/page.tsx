'use client'

import { useEffect } from 'react'
import { UpdateInfoUser } from '@/utils/updateInfoUser'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const SucessoPayment = ({ params }: any) => {
  const searchParams = useSearchParams()
  const id_session_payment: any = searchParams.get('plan')
  const nameLink_Id: any = searchParams.get('nameId')
  const checkoutPaymente = params.id

  useEffect(() => {
    console.log('ID ==>', id_session_payment, nameLink_Id)
    UpdateInfoUser({ plans: id_session_payment, nameLink: nameLink_Id })

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
          <p>Monte seu super perfil da melhor forma.</p>
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
