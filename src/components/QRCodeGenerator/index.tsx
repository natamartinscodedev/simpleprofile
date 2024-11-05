'use client'

import React from 'react'
import { useQRCode } from 'next-qrcode'

const QRCodeGenerator = ({ linkQrcode }: any) => {
  const { Canvas } = useQRCode()

  return (
    <>
      <Canvas
        text={linkQrcode}
        options={{
          errorCorrectionLevel: 'M',
          margin:2,
          scale: 5,
          width: 250,
          color: {
            dark: '#ffffff',
            light: '#333'
          },
          quality: 1000,
        }}
      />
    </>
  )
}

export default QRCodeGenerator
