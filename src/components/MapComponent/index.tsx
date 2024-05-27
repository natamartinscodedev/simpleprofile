// MapComponent.js
import React from 'react';

const MapComponent = () => {

    return (
        <div>
            <iframe
                width="100%"
                height="100%"
                src={`https://maps.google.com/maps?q=${location}&z=15&output=embed`}
            />
        </div>
    );
};

export default MapComponent;
