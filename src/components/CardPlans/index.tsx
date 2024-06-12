import React, { useState } from 'react'
import { Post } from '@/utils/createUser'
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');
interface typePlans {
    tipePlan: string,
    price: number | string,
    state: boolean,
    children: any,
    idPlans: string,
    email: string,
    nameLink: string
}

const CardPlan = ({ tipePlan, price, state, children, idPlans, email, nameLink }: typePlans) => {
    const [plans, setPlans] = useState("")

    async function handleclick() {
        try {
            setPlans(idPlans)
            // choose plan
            const stripe: any = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                lineItems: [{ price: idPlans, quantity: 1 }],
                mode: 'subscription',
                successUrl: `${window.location.origin}/success`,
                cancelUrl: `${window.location.origin}/canceled`,
            });

            // login after choose plan
            if (email) {
                await Post({ nameLink, email, plans });
                await sendSignInLinkToEmail(auth, email, {
                    // rotas dinamica in18?
                    url: 'http://localhost:3000/User',
                    handleCodeInApp: true,
                }).then(() => {
                    window.localStorage.setItem('emailForSignIn', email);
                }).catch((err) => {
                    console.log("Error ==>", err)
                })

                alert("Link de login enviado para seu E-mail! 🤠")
            }

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

            <button onClick={handleclick}>Escolha o plano</button>
        </div>
    )
}

export default CardPlan