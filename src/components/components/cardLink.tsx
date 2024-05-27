'use client'
import Link from 'next/link'
import React from 'react'

const CardLink = ({ text, link }: any) => {
  return (
    <Link href={link} className='card_btn'>
      {text}
    </Link>
  )
}

export default CardLink