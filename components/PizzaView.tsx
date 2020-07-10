import React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZnJhbmxld2ViIiwiYSI6ImNqdzhjZHUyeTA4NWo0MXBkNTd4NzRhZXUifQ.-nXUbw5Lc7E7AQWptuxAhw'
})

const paintLayer = {
  'fill-extrusion-color': '#aaa',
  'fill-extrusion-height': {
    type: 'identity',
    property: 'height'
  },
  'fill-extrusion-base': {
    type: 'identity',
    property: 'min_height'
  },
  'fill-extrusion-opacity': 0.6
}

const lat = 51.5144951
const lng = -0.0824952


const PizzaView: React.FC<{}> = () => (
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: '100vh',
      width: '100vw',
      // flex: 1
    }}
    zoom={[ 5 ]}
    center={[lng, lat]}
    pitch={[0]}
    bearing={[0]}
  >
    <Layer
      id="3d-buildings"
      sourceId="composite"
      sourceLayer="building"
      filter={['==', 'extrude', 'true']}
      type="fill-extrusion"
      minZoom={14}
      paint={paintLayer}
    />
  </Map>
)

export default PizzaView
