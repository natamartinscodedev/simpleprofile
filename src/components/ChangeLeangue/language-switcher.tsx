'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useTransition } from 'react'

const Langues = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const onChangeLangague = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value

        startTransition(() => {
            router.replace(`/${nextLocale}`)
        })
    }

    return (
        <label htmlFor="lang" className=''>
            <select name="lang" id="lang" onChange={onChangeLangague} className=''>
                <option value="en" id='lang'>Português</option>
                <option value="pt" id='lang'>English</option>
            </select>
        </label>
    )
}

export default Langues