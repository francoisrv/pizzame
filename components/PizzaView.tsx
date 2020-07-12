import React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import ReactMapGL, { Marker, ViewportProps, Popup } from 'react-map-gl'
import Pizza from '../assets/pizza.png'

const TOKEN = 'pk.eyJ1IjoiZnJhbmxld2ViIiwiYSI6ImNqdzhjZHUyeTA4NWo0MXBkNTd4NzRhZXUifQ.-nXUbw5Lc7E7AQWptuxAhw'

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

interface Place {
  name: string
  latitude: number
  longitude: number
}

const places: Place[] = [
  {
    name: 'Pizza by Toni',
    latitude: lat - 0.002,
    longitude: lng - 0.002
  },
  {
    name: 'Napoli Pizza',
    latitude: lat - 0.004,
    longitude: lng + 0.004
  },
  {
    name: 'Pizza Heaven',
    latitude: lat + 0.004,
    longitude: lng - 0.004
  },
  {
    name: 'Little Italy',
    latitude: lat + 0.005,
    longitude: lng - 0.006
  },
]

const PizzaView: React.FC<{}> = () => {
  const [viewport, setViewport] = React.useState<ViewportProps>({
    latitude: lat,
    longitude: lng,
    width: '100vw',
    height: '100vh',
    zoom: 15
  })
  const [marker, setMarker] = React.useState<Place | null>(null)
  return (
    <ReactMapGL
      { ...viewport }
      mapboxApiAccessToken={TOKEN}
      onViewportChange={ viewport => {
        setViewport(viewport)
      } }
    >
      { places.map(place => (
        <Marker key={ place.name } latitude={ place.latitude } longitude={ place.longitude }>
          <div>
            <img src={ Pizza } onClick={ () => setMarker(place) } />
          </div>
        </Marker>
      )) }
      { marker && (
        <Popup
          latitude={ marker.longitude }
          longitude={ marker.longitude }
        >
          <div>Hello</div>
        </Popup>
      ) }
    </ReactMapGL>
  )
}

export default PizzaView
