import React from 'react'
import ReactMapGL, { Marker, ViewportProps, Popup } from 'react-map-gl'
import { pick } from 'lodash'
import { connect } from 'react-redux'

import ReduxState from '../redux/state'
import { previewRestaurant } from '../redux/actions/restaurants.actions'
import PizzaMarker from './PizzaMarker'
import config from '../config'

type PizzaViewStateProps = Pick<ReduxState, 'restaurants'> &
  Pick<ReduxState, 'coords'>

interface PizzaViewActions {
  previewRestaurantAction: typeof previewRestaurant
}

const connector = (state: ReduxState): PizzaViewStateProps =>
  pick(state, ['restaurants', 'coords'])

const actions: PizzaViewActions = {
  previewRestaurantAction: previewRestaurant,
}

const withStore = connect(connector, actions)

type PizzaViewProps = PizzaViewStateProps & PizzaViewActions

const PizzaView: React.FC<PizzaViewProps> = (props) => {
  const [viewport, setViewport] = React.useState<ViewportProps>({
    latitude: props.coords[0],
    longitude: props.coords[1],
    width: '100vw',
    height: 'calc(100vh - 45px)',
    zoom: 15,
    transitionDuration: 3000,
  })

  React.useEffect(() => {
    setViewport({
      latitude: props.coords[0],
      longitude: props.coords[1],
      width: '50%',
      height: 'calc(100vh - 45px)',
      zoom: 15,
    })
  }, [props])

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={config.mapToken}
      onViewportChange={(viewport) => {
        setViewport(viewport)
      }}
    >
      {props.restaurants.map((restaurant) => (
        <Marker
          key={restaurant.name}
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
        >
          <img
            className="rotate"
            src="https://storage.cloud.google.com/pizzame/pizza.png"
            onClick={() => props.previewRestaurantAction(restaurant)}
            style={
              {
                // marginTop: -20
              }
            }
          />
        </Marker>
      ))}
      <PizzaMarker />
    </ReactMapGL>
  )
}

export default withStore(PizzaView)
