'use client'

import Image from 'next/image'
import React from 'react'

interface typeImgVd {
  url: string
  changeImgVideo: any
}

const ImageComponent = ({ url, changeImgVideo }: typeImgVd) => {
  const typeImg = 'jpeg' || 'png' || 'dvg'

  return (
    <div className="box-img">
      {changeImgVideo === `image/${typeImg}` ? (
        <Image src={url && url} alt={url} width={100} height={100} />
      ) : (
        <video autoPlay loop muted controls>
          <source src={url && url} type="video/mp4" />
        </video>
      )}
    </div>
  )
}

export default ImageComponent
