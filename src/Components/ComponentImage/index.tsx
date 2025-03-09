'use client'

import Image from 'next/image'
import React from 'react'

interface typeImgVd {
  url : {
    url: string
  },
}

const ImageComponent = ({ url }: typeImgVd) => {
  return (
    <div className="box-img">
        <Image src={url && url.url} alt={url.url} width={1000} height={1000} />
    </div>
  )
}

export default ImageComponent
