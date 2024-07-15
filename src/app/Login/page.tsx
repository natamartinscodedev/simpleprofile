"use client"


import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase'
import loginMagicLink from '@/utils/login';
import Link from 'next/link';
import NavBar from '@/components/Navbar/index'
import { MoveLeft } from 'lucide-react';
import CardAlert from '@/components/components/cardAlert'
import { GetDataUser } from '@/utils/fetchGetDataUser'

const Index = () => {
    const [user, loading, error]: any = useAuthState(auth)
    const [email, setEmail] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const handleEmail = async () => {
        try {
            const { User }: any = await GetDataUser(email)
            if (user && User.email === email) {
                loginMagicLink(email)
                return setShowAlert(true)
            } else {
                return setShowAlert(true)
            }
        } catch (err) {
            console.log("ERR ==>", err)
        }
    }

    return (
        <>
            <NavBar state={false} />
            <div className='card_login container'>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className='card_login-info'>
                            <Link href='/'><MoveLeft /></Link>
                            <form>
                                <label htmlFor="email">Email</label>
                                <input id='email' type="email" placeholder='Digite seu E-Mail...' onChange={(e: any) => setEmail(e.target.value)} />
                            </form>
                            <button onClick={handleEmail}>Login</button>
                            {showAlert && <CardAlert
                                state={user}
                                open={true}
                                text={user ?
                                    "Link Enviado ao seu email!🚀" :
                                    "Voce não possue conta com este email! Crie já sua conta no Simple Prifile🚀"
                                } />}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Index