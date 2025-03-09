'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface typeBtnlinks {
  Icon$img: any
  nameHover: string
  imgBoolean: boolean
  openModalType: any
  addCardLink?: any
  addCardText?: any
  addCardMap?: any
  setLink?: any
  link?: any
  typeInputMidia?: any
  statusPlans?: any
}

const BtnLinks = ({
  Icon$img,
  nameHover,
  imgBoolean,
  openModalType,
  addCardLink,
  addCardMap,
  addCardText,
  setLink,
  link,
  statusPlans
}: typeBtnlinks) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    switch (openModalType) {
      case 'text':
        addCardText()
        break
      case 'map':
        if (imgBoolean === true) {
          addCardMap()
        }
        break
    }

    if (openModalType === 'link' && open === false) {
      setOpen(true)
    }
  }

  const handleInputLink = () => {
    addCardLink()
    setOpen(false)
  }

  return (
    <li
      className={`card_btn-links`}
      onClick={handleClick}
      // aria-disabled={true}
    >
      {open === true && (
        <div
          className="modal_links"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {/* <button onClick={() => setOpen(false)} className='modal_closed'>X</button> */}
          <input
            className="input_links"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder='link of midia...'
          />

          {
            link && (
              <button onClick={() => handleInputLink()}>Add</button>
            )
          }
        </div>
      )}

      <div
        className="img_card-links"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <p>{nameHover}</p>
      </div>
      {imgBoolean === true && <Image src={Icon$img} alt="icons links" />}
      {imgBoolean === false && Icon$img}
    </li>
  )
}

export default BtnLinks
