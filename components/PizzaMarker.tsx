import React from 'react'
import ReduxState from '../redux/state'
import { kebabCase, pick } from 'lodash'
import { connect } from 'react-redux'
import { Popup } from 'react-map-gl'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { setCoords, setMapHeight } from '../redux/actions/map.actions'
import { selectRestaurant } from '../redux/actions/restaurants.actions'

type PizzaMarkerStore =
& Pick<ReduxState, "previewedRestaurant">

interface PizzaMarkeActions {
  setCoordsAction: typeof setCoords
  setMapHeightAction: typeof setMapHeight
  selectRestaurantAction: typeof selectRestaurant
}

const connector = (state: ReduxState): PizzaMarkerStore => pick(state, ['previewedRestaurant'])

const actions: PizzaMarkeActions = {
  setCoordsAction: setCoords,
  setMapHeightAction: setMapHeight,
  selectRestaurantAction: selectRestaurant
}

const withStore = connect(connector, actions)

type PizzaMarkerProps =
& PizzaMarkerStore
& RouteComponentProps<any>
& PizzaMarkeActions

const PizzaMarker: React.FC<PizzaMarkerProps> = props => {
  if (!props.previewedRestaurant) {
    return <div />
  }

  function goToRestaurant() {
    props.selectRestaurantAction(props.previewedRestaurant)
  }

  return (
    <Popup
      latitude={ props.previewedRestaurant.latitude }
      longitude={ props.previewedRestaurant.longitude }
    >
      <Typography onClick={ goToRestaurant }>
        { props.previewedRestaurant.name }
      </Typography>
    </Popup>
  )
}

export default compose(withRouter, withStore)(PizzaMarker)
