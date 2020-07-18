import React from 'react'
import { pick, kebabCase } from 'lodash'
import { connect } from 'react-redux'
import { Popup } from 'react-map-gl'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'

import ReduxState from '../redux/state'
import { selectRestaurant, resetPreviewRestaurant } from '../redux/actions/restaurants.actions'
import Ratings from './Ratings'

type PizzaMarkerStore =
& Pick<ReduxState, "previewedRestaurant">

interface PizzaMarkeActions {
  selectRestaurantAction: typeof selectRestaurant
  resetPreviewRestaurantAction: typeof resetPreviewRestaurant
}

const connector = (state: ReduxState): PizzaMarkerStore => pick(state, ['previewedRestaurant'])

const actions: PizzaMarkeActions = {
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
