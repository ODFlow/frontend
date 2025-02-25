import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';

const Map = ({ properties }) => {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
  });

  return (
    <MapGL
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      style={{ width: '100%', height: '400px' }}
    >
      {properties.map((property) => (
        <Marker key={property.id} latitude={property.location.lat} longitude={property.location.lon}>
          <div style={{ background: 'red', width: '10px', height: '10px', borderRadius: '50%' }} />
        </Marker>
      ))}
    </MapGL>
  );
};

export default Map;