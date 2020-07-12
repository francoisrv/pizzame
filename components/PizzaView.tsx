import React from 'react'
import ReactMapGL, { Marker, ViewportProps, Popup } from 'react-map-gl'
import { pick } from 'lodash'
import { connect } from 'react-redux'

import Pizza from '../assets/pizza.png'
import ReduxState from '../redux/state'
import { selectRestaurant } from '../redux/actions/restaurants.actions'
import PizzaMarker from './PizzaMarker'

const TOKEN = 'pk.eyJ1IjoiZnJhbmxld2ViIiwiYSI6ImNqdzhjZHUyeTA4NWo0MXBkNTd4NzRhZXUifQ.-nXUbw5Lc7E7AQWptuxAhw'


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

type PizzaViewStateProps =
& Pick<ReduxState, "restaurants">
& Pick<ReduxState, "coords">

interface PizzaViewActions {
  selectRestaurantAction: typeof selectRestaurant
}

const connector = (state: ReduxState): PizzaViewStateProps => pick(state, ['restaurants', 'coords'])

const actions: PizzaViewActions = {
  selectRestaurantAction: selectRestaurant
}

const withStore = connect(connector, actions)

type PizzaViewProps =
& PizzaViewStateProps
& PizzaViewActions

const PizzaView: React.FC<PizzaViewProps> = props => {
  const [viewport, setViewport] = React.useState<ViewportProps>({
    latitude: props.coords[0],
    longitude: props.coords[1],
    width: '100vw',
    height: '100vh',
    zoom: 15
  })
  return (
    <ReactMapGL
      { ...viewport }
      mapboxApiAccessToken={TOKEN}
      onViewportChange={ viewport => {
        setViewport(viewport)
      } }
    >
      { props.restaurants.map(restaurant => (
        <Marker key={ restaurant.name } latitude={ restaurant.latitude } longitude={ restaurant.longitude }>
          <div>
            <img
              className="rotate"
              src={ Pizza }
              onClick={ () => props.selectRestaurantAction(restaurant) }
              style={{
                marginTop: -20
              }}
            />
          </div>
        </Marker>
      )) }
      <PizzaMarker />
    </ReactMapGL>
  )
}

export default withStore(PizzaView)
