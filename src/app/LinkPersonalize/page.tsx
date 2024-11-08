'use client'

import React, { useEffect, useState } from 'react'
import { Check, MoveLeft, X, ALargeSmall } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { checkNameAvailability } from '@/utils/verificNameLink'
import NavBar from '@/components/Navbar/index'
import CreateUserSingUp from '@/components/CreateSingUp/Index'
import ImageIconPage from '../../../public/Images/image_pages.png'

const SingUp = () => {
  const { register, handleSubmit } = useForm()
  const [changeComponents, setChangeComponents] = useState(false)
  const [nameLink, setNameLink] = useState('')
  const [erro, setErro] = useState(false)
  const [load, setLoad] = useState(null)

  const handlePush = async (data: any) => {
    if (nameLink) {
      setChangeComponents(!false)
    }
  }

  const handleRegexNameLink = (e: any) => {
    const nomeRegex = /^[a-zA-Z0-9]+$/

    if (nomeRegex.test(e)) {
      setErro(false)
    } else {
      setErro(true)
    }

    setNameLink(e)
  }

  useEffect(() => {
    if (!nameLink) return setLoad(null)

    if (nameLink) {
      checkNameAvailability({ nameLink, setLoad })
    }
  }, [nameLink])

  return (
    <>
      {!changeComponents ? (
        <div>
          <NavBar state={false} />
          <div className="container_link-name container ">
            <div className="box_info_link-name">
              <Link href="/">
                <MoveLeft />
              </Link>
              <div className="box_text-link-personalize">
                <h2>Primeiro, insira seu nome no link unico!</h2>
                <p>Os bons ainda estão disponíveis!</p>
              </div>
              <form
                onSubmit={handleSubmit(handlePush)}
                className="box_input-namelink"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div className="box_input-namelink-input">
                  <span>simpleprofile.me/</span>
                  <input
                    type="text"
                    placeholder="Nome personalizado..."
                    required
                    value={nameLink}
                    {...register('name')}
                    onChange={e => handleRegexNameLink(e.target.value)}
                  />
                  {erro ? (
                    <p className="card_error-nameLink" style={{ color: 'red' }}>
                      O nome deve conter apenas letras e números, sem espaços ou caracteres especiais.</p>) : ('')
                  }
                  <div>
                    {load === null && (<ALargeSmall color="black" />)}
                    {load === true && (<p><Check color="green" /></p>)}
                    {load === false && (<p><X color="red" /></p>)}
                  </div>
                </div>
                {nameLink && <button type="submit">Pegar link</button>}
              </form>
              <Link href="/Login">Faça login</Link>
            </div>
            <div
              className="box_info-image"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <Image src={ImageIconPage} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <CreateUserSingUp
          changeState={setChangeComponents}
          nameLink={nameLink}
        />
      )}
    </>
  )
}

export default SingUp
