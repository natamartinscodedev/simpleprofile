"use client"

import { checkNameAvailability } from '@/utils/verificNameLink';
import React, { useEffect, useState } from 'react'
import NavBar from '@/components/Navbar/index'
import CreateUserSingUp from '@/components/CreateSingUp/Index'
import Image from 'next/image';
import ImageIconPage from '@/Images/image_pages.png'
import Link from 'next/link';
import { Check, MoveLeft, X } from 'lucide-react';

const SingUp = () => {
    const [changeComponents, setChangeComponents] = useState(false)
    const [nameLink, setNameLink] = useState('')
    const [load, setLoad] = useState(null)

    const handlePush = async (e: any) => {
        e.preventDefault()
        if (nameLink) {
            setChangeComponents(!false)
        }
    }

    useEffect(() => {
        if (nameLink) {
            checkNameAvailability({ nameLink, setLoad })
        }
    }, [nameLink]);

    return (
        <>
            {
                !changeComponents ? (
                    <div>
                        <NavBar state={false} />
                        <div className="container_link-name container ">
                            <div className='box_info_link-name'>
                                <Link href='/'><MoveLeft /></Link>
                                <div className="box_text-link-personalize">
                                    <h2>Primeiro, insira seu nome no link unico!</h2>
                                    <p>Os bons ainda estão disponíveis!</p>
                                </div>
                                <form onSubmit={handlePush} className="box_input-namelink">
                                    <div className='box_input-namelink-input'>
                                        <span>simpleprofile.me/</span>
                                        <input
                                            type="text"
                                            placeholder="seu-nome"
                                            value={nameLink}
                                            onChange={(e) => setNameLink(e.target.value)}
                                        />
                                        <div>
                                            {
                                                load && nameLink ? (
                                                    <p><Check color='green' /></p>
                                                ) : (
                                                    <p><X color='red' /></p>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        nameLink && (
                                            <button type='submit'>Pegar link</button>
                                        )
                                    }
                                </form>
                                <Link href='/pages/Login'>Faça login</Link>
                            </div>
                            <div className='box_info-image'>
                                <Image src={ImageIconPage} alt='' />
                            </div>
                        </div>
                    </div>

                ) : (
                    <CreateUserSingUp changeState={setChangeComponents} nameLink={nameLink} />
                )
            }
        </>
    )
}

export default SingUp