import React, { useState } from 'react'
import { Post } from '@/utils/createUser'
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';

const stripePromise: any = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

interface typePlans {
    tipePlan: string,
    price: number | string,
    state: boolean,
    children: any,
    idPlans: string,
    email?: string,
    nameLink?: string
}

const CardPlan = ({ tipePlan, price, state, children, idPlans, email, nameLink }: typePlans) => {
    const [plans, setPlans] = useState("")

    // async function handleclick() {
    //     try {
    //         // login after choose plan
    //         if (email) {
    //             await Post({ nameLink, email, plans });
    //             await sendSignInLinkToEmail(auth, email, {
    //                 // rotas dinamica in18?
    //                 url: 'http://localhost:3000/User',
    //                 handleCodeInApp: true,
    //             }).then(() => {
    //                 window.localStorage.setItem('emailForSignIn', email);
    //             }).catch((err) => {
    //                 console.log("Error ==>", err)
    //             })

    //             alert("Link de login enviado para seu E-mail! 🤠")
    //         }

    //         return console.log("Chegou aqui ==>")
    //     } catch (err) {
    //         console.error('Erro ao enviar o link de autenticação:', err);
    //     }
    // };
    const [loading, setLoading] = useState(false);

    const createCheckOutSession = async (idPlans: string) => {
        setLoading(true);
        try {
            const stripe = await stripePromise;
            const res = fetch('/api/create-stripe-session')
            console.log("Res ==>", await res)
            const checkoutSession = await axios.post('/api/create-stripe-session', { plan: idPlans });
            const result = await stripe?.redirectToCheckout({
                sessionId: checkoutSession.data.id,
            });
            if (result?.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        } finally {
            setLoading(false);
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
                onClick={() => createCheckOutSession(idPlans)}
                disabled={loading}
            >
                {loading ? 'Processando...' : 'Escolher Plano Gold'}
            </button>
        </div>
    )
}

export default CardPlan