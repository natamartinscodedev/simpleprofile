'use client'

import React, { useState } from 'react'

const MapComponent = () => {
  const [location, setLocation] = useState('')

  const handleInputChange = (e: any) => {
    setLocation(e.target.value)
  }

  return (
    <div className="card_map">
      <input
        type="text"
        placeholder="Digite a localização"
        value={location}
        onChange={handleInputChange}
      />
      <iframe
        width="100%"
        height="100%"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(
          location
        )}&z=15&output=embed`}
        allowFullScreen
      />
    </div>
  )
}

export default MapComponent
