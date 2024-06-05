import React from 'react'

interface typePlans {
    tipePlan: string,
    price: number | string,
    state: boolean,
    children: any
}

const CardPlan = ({ tipePlan, price, state, children }: typePlans) => {
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

            <button>Escolha o plano</button>
        </div>
    )
}

export default CardPlan