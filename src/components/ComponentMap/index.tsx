'use client'

import React from 'react'

const MapComponent = () => {
  return (
    <div className="card_map">
      <iframe
        width="100%"
        height="100%"
        src={`https://maps.google.com/maps?q=${location}&z=15&output=embed`}
      />
    </div>
  )
}

export default MapComponent
