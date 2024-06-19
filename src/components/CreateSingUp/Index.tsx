"use client"
import React, { useEffect, useState } from 'react'
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase'
import { checkEmailAvailability } from '@/utils/verificEmail';
import { Post } from '@/utils/createUser'
import Image from 'next/image';
import ImageIconPage from '@/Images/image_pages.png'
import Plans from '@/app/Plans/index'
import { Mail, MoveLeft } from 'lucide-react';
import Link from 'next/link';

interface TypeProps {
  changeState: any,
  nameLink: string,
}

const Index = ({ changeState, nameLink }: TypeProps) => {
  const [email, setEmail] = useState<string | ''>('')
  const [openPlan, setOpenPlan] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      if (email) {
        await Post({ nameLink, email, plans: 'free' });
        await sendSignInLinkToEmail(auth, email, {
          url: 'http://localhost:3000/User',
          handleCodeInApp: true,
        }).then(() => {
          window.localStorage.setItem('emailForSignIn', email);
        }).catch((err) => {
          console.log("Error ==>", err)
        })

        alert("Link de login enviado para seu E-mail! 🤠")
      }

      return
    } catch (err) {
      console.error('Erro ao enviar o link de autenticação:', err);
    }
  };

  const backPage = (e: any) => {
    e.preventDefault()
    changeState(!!false)
  }

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        try {
          await checkEmailAvailability({ email });
        } catch (err) {
          console.log("Erro ao verificar disponibilidade do e-mail:", err);
        }
      }
    }
    checkEmail()

  }, [email]);

  return (
    <>
      {
        openPlan ?
          (
            <div className='card_plans-change'>
              <button onClick={() => setOpenPlan(false)}>Voltar</button>
              <Plans email={email} nameLink={nameLink} />
            </div>
          ) : (
            <div className='container_sing-up container '>
              <div className='container_sing-up-info'>
                <div className='box_info'>
                  <button onClick={backPage}> <MoveLeft /></button>
                  <p>sipleProfile/<span>{nameLink}</span> é você!</p>
                  <h2>Agora, crie sua conta.</h2>
                  <h4>Monte seu perfil profissional já.</h4>
                  <b>Crie sua conta de forma rapida, insira apenas o seu
                    email para se cadastrar!</b>
                </div>
                <form onSubmit={handleSubmit} className='box_input-form'>
                  {/* add zood for validation in all forms*/}
                  <div>
                    <span><Mail /></span>
                    <input
                      type="email"
                      name='email'
                      id='email'
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                      placeholder='Digite seu email.'
                    />
                  </div>

                  <button>Escolher Plano</button>
                </form>
                <div className='box_link-login'>
                  <p> ------------ OR ------------ </p>
                  <Link href='/LinkPersonalize'>Faça Login</Link>
                </div>
              </div>
              <div className='container_sing-up-image'>
                <Image src={ImageIconPage} alt='' />
              </div>
            </div>
          )
      }
    </>
  )
}

export default Index