import React, { useState } from 'react'
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase'
import { FetchPost } from '@/utils/createUser';
interface typePlans {
    tipePlan: string,
    price: any,
    state: boolean,
    children: any,
    idPlans: string,
    email?: string,
    nameLink: string
}

const Url = process.env.NEXT_PUBLIC_API_URL
console.log("URL ==>", `${Url}/User`)

const CardPlan = ({ tipePlan, price, state, children, idPlans, email, nameLink }: typePlans) => {
    const [loading, setLoading] = useState(false);

    async function handleclick() {
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

            return console.log("Chegou aqui ==>")
        } catch (err) {
            console.error('Erro ao enviar o link de autenticação:', err);
        }
    };

    return (
        <div className={state ? 'box_plans-state' : 'box_plans'}>
            {
                state && <span>Mais popular</span>
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