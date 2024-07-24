"use client"


import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase'
import loginMagicLink from '@/utils/login';
import Link from 'next/link';
import NavBar from '@/components/Navbar/index'
import { MoveLeft } from 'lucide-react';
import CardAlert from '@/components/components/cardAlert'
import { GetDataUser } from '@/utils/getInfoUser'
import { VerificarChaveValida } from '@/utils/saveKeyLocalStorage';
import { signInWithEmailLink } from 'firebase/auth';
import { useRouter } from "next/navigation";

const Index = () => {
    const [user, loading, error]: any = useAuthState(auth)
    const [email, setEmail] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()

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

    useEffect(() => {
        const confirmApiKey = localStorage.getItem('apiKey');
        console.log("Confirm ==>", confirmApiKey)

        async function loginUser() {
            if (VerificarChaveValida(confirmApiKey)) {
                let email = window.localStorage.getItem('emailForSignIn');
                const { User }: any = await GetDataUser(email)
                if (!email) {
                    alert('E-mail para login não encontrado, Faça login novamente!')
                    return router.push('/Login');
                }

                console.log('Email ==>', email)
                console.log('User ==>', User.nameLink)
                try {
                    // await signInWithEmailLink(auth, email, window.location.href)
                    // return router.replace(`/User/${User.nameLink}`)
                } catch (error) {
                    console.error('Erro ao completar o login com link mágico:', error);
                    router.push('/error');
                }
            }
        }
        loginUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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