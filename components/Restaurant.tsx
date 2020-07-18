import React from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import { kebabCase, pick } from 'lodash'
import Typography from '@material-ui/core/Typography'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { goToAction } from '../redux/actions/router.actions'
import { resetSelectRestaurant } from '../redux/actions/restaurants.actions'
import ReduxState from '../redux/state'
import MenuView from './Menu'
import Ratings from './Ratings'
import { restaurantView, restaurantHeaderStyle, restaurantInnerHeaderStyle, backArrowStyle, videoParallaxContainer, videoParallaxWrapper } from '../styles/surfaces'

type RestaurantStore =
  Pick<ReduxState, 'selectedRestaurant'>

interface RestaurantActions {
  goToAction: typeof goToAction,
  resetSelectRestaurantAction: typeof resetSelectRestaurant
}

const connector = (state: ReduxState): RestaurantStore => pick(state, ['selectedRestaurant'])

const actions: RestaurantActions = {
  goToAction,
  resetSelectRestaurantAction: resetSelectRestaurant
}

const withStore = connect(connector, actions)

type RestaurantViewProps =
  & RestaurantActions
  & RestaurantStore

const RestaurantView: React.FC<RestaurantViewProps> = props => {
  return (
    <div className={ restaurantView }>
      <header className={ restaurantHeaderStyle }>
        <div className={ restaurantInnerHeaderStyle }>
          <ArrowBackIosIcon
            className={ backArrowStyle }
            onClick={() => {
              props.goToAction('/')
              props.resetSelectRestaurantAction()
            }}
          />
          <div>
            <Typography variant="h1">
              {props.selectedRestaurant.name}
            </Typography>
            <Ratings ratings={props.selectedRestaurant.ratings} size={4.5} />
          </div>
        </div>
      </header>

      <div className={ videoParallaxContainer }>
        <div className={ videoParallaxWrapper }>
          <ReactPlayer
            url={`https://storage.cloud.google.com/pizzame/${kebabCase(props.selectedRestaurant.name)}.webm`}
            loop
            width="100%"
            height="100%"
            playing
          />
        </div>
      </div>

      <MenuView />
    </div>
  )
}

export default withStore(RestaurantView)
