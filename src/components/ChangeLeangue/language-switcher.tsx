'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useTransition } from 'react'

const Langues = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const onChangeLangague = (e: ChangeEvent<HTMLSelectElement>) => {

        startTransition(() => {
            router.replace(`/${e}`)
        })
    }

    return (
        <label htmlFor="lang" className=''>
            <select name="lang" id="lang" onChange={(e: any) => onChangeLangague(e.target.value)} className=''>
                <option value="pt-BR" id='lang'>Português</option>
                <option value="en-US" id='lang'>English</option>
            </select>
        </label>
    )
}

export default Langues