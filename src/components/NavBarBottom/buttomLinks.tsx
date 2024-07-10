'use client'

import Image from 'next/image'
import React, { useState } from 'react'
interface typeBtnlinks {
    icon$img: any,
    nameHover: string,
    imgBoolean: boolean,
    openModalType: string,
    addCard?: any,
    setLink?: any,
    link?: any
}

const BtnLinks = ({ icon$img, nameHover, imgBoolean, openModalType, addCard, setLink, link }: typeBtnlinks) => {
    const [open, setOpen] = useState("")
    const handleClick = () => {
        setOpen(openModalType)
    }

    return (
        <li className='card_btn-links' onClick={() => handleClick()}>
            {open === 'link' &&
                <div className='modal_links'>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)} />
                    <button onClick={() => addCard()}>Add</button>
                </div>
            }
            <span>{nameHover}</span>
            {imgBoolean === true && <Image src={icon$img} alt='icons links' />}
            {imgBoolean === false && icon$img}
        </li>
    )
}

export default BtnLinks