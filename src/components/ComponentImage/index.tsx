'use client'

import Image from 'next/image'
import React from 'react'

interface typeImgVd {
  url : {
    url: string
  },
  changeImgVideo: any
}

const ImageComponent = ({ url, changeImgVideo }: typeImgVd) => {

  return (
    <div className="box-img">
        <Image src={url && url.url} alt={url.url} width={100} height={100} />
    </div>
  )
}

export default ImageComponent
