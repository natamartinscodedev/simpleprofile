'use client'

import React from 'react'

interface typeImgVd {
  url : {
    url: string
  },
  changeImgVideo: any
}


const index = ({ url }: any) => {
 return (
   <div className="box-img">
     <video autoPlay loop muted controls>
       <source src={url && url.url} type="video/mp4" />
     </video>
   </div>
 )
}

export default index
