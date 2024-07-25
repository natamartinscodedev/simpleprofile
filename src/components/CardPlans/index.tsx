import React, { useState } from 'react'
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase'
import { FetchPost } from '@/utils/createUser';
import { useRouter } from "next/navigation";
interface typePlans {
    tipePlan: string,
    price: any,
    state: boolean,
    stateLink: boolean,
    children: any,
    idPlans?: string,
    email?: string,
    nameLink?: any,
    disable?: boolean,
}

const Url = process.env.NEXT_PUBLIC_VERCEL_ENV

const CardPlan = ({ tipePlan, price, state, children, idPlans, stateLink, email, nameLink, disable }: typePlans) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    async function handleclick() {
        if (stateLink === true) { router.push('/Login') }

        try {
            setLoading(true)
            if (email) {
                await FetchPost({
                    nameLink,
                    email,
                    plans: price,
                    name: '',
                    bio: '',
                    image: '',
                });

                await sendSignInLinkToEmail(auth, email, {
                    url: `${Url}/User`,
                    handleCodeInApp: true,
                }).then(() => {
                    window.localStorage.setItem('emailForSignIn', email);
                }).catch((err) => {
                    console.log("Error ==>", err)
                })

                alert("Link de login enviado para seu E-mail! 🤠")
            }
            setLoading(false)
        } catch (err) {
            console.error('Erro ao enviar o link de autenticação:', err);
        }
    };

    return (
        <div className={state ? 'box_plans-state' : 'box_plans'}>
            {
                state && <span>{disable ? "Indisponivel no momento!!!" : "Mais popular"}</span>
            }
            <p>{tipePlan}</p>
            <h3>${price} {state && <b>/mes</b>}</h3>

            <ul>
                {children}
            </ul>

            <button
                onClick={() => handleclick()}
                disabled={loading}
            >
                {loading ? 'Processando...' : 'Escolher Plano'}
            </button>
        </div>
    )
}

export default CardPlan