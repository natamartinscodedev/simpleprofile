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
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#ffffff',
            light: '#030659'
          }
        }}
      />
    </>
  )
}

export default QRCodeGenerator
