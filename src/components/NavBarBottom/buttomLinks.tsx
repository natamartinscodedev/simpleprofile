'use client'

import Image from 'next/image'
import React, { useState } from 'react'
interface typeBtnlinks {
  icon$img: any
  nameHover: string
  imgBoolean: boolean
  openModalType: any
  addCardLink?: any
  addCardText?: any
  addCardMap?: any
  setLink?: any
  link?: any
}

const BtnLinks = ({
  icon$img,
  nameHover,
  imgBoolean,
  openModalType,
  addCardLink,
  addCardMap,
  addCardText,
  setLink,
  link
}: typeBtnlinks) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    switch (openModalType) {
      case 'text':
        addCardText()
        break
      case 'map':
        addCardMap()
        break
    }
    if (openModalType === 'link') {
      setOpen(!open)
    }
  }

  const handleInputLink = () => {
    addCardLink()
    setOpen(false)
  }

  return (
    <li className="card_btn-links" onClick={() => handleClick()}>
      {open ? (
        <>
          <div className="modal_links">
            <input
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
            />
            <button onClick={() => handleInputLink()}>Add</button>
          </div>
        </>
      ) : (
        ''
      )}
      <span>{nameHover}</span>
      {imgBoolean === true && <Image src={icon$img} alt="icons links" />}
      {imgBoolean === false && icon$img}
    </li>
  )
}

export default BtnLinks
