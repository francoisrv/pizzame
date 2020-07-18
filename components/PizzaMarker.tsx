import React from 'react'
import ReduxState from '../redux/state'
import { pick, kebabCase } from 'lodash'
import { connect } from 'react-redux'
import { Popup } from 'react-map-gl'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { setCoords, setMapHeight } from '../redux/actions/map.actions'
import { selectRestaurant, resetPreviewRestaurant } from '../redux/actions/restaurants.actions'
import ReactPlayer from 'react-player'
import EmptyStarIcon from '@material-ui/icons/StarBorder'
import FullStarIcon from '@material-ui/icons/Star'
import HalfFullStarIcon from '@material-ui/icons/StarHalf'
import Ratings from './Ratings'

type PizzaMarkerStore =
& Pick<ReduxState, "previewedRestaurant">

interface PizzaMarkeActions {
  setCoordsAction: typeof setCoords
  setMapHeightAction: typeof setMapHeight
  selectRestaurantAction: typeof selectRestaurant
  resetPreviewRestaurantAction: typeof resetPreviewRestaurant
}

const connector = (state: ReduxState): PizzaMarkerStore => pick(state, ['previewedRestaurant'])

const actions: PizzaMarkeActions = {
  setCoordsAction: setCoords,
  setMapHeightAction: setMapHeight,
  selectRestaurantAction: selectRestaurant,
  resetPreviewRestaurantAction: resetPreviewRestaurant
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
      onClose={ props.resetPreviewRestaurantAction }
      closeOnClick={ false }
    >
      <div onClick={ goToRestaurant }>
        <Typography>
          { props.previewedRestaurant.name }
        </Typography>
        <div>
          <Ratings ratings={ props.previewedRestaurant.ratings } />
        </div>
        <ReactPlayer
          url={ `https://storage.cloud.google.com/pizzame/${ kebabCase(props.previewedRestaurant.name) }.webm` }
          loop
          width={ 180 }
          height={ 100 }
          playing
        />
      </div>
    </Popup>
  )
}

export default compose(withRouter, withStore)(PizzaMarker)
