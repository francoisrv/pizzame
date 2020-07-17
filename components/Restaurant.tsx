import React from 'react'
import { goToAction } from '../redux/actions/router.actions'
import { connect } from 'react-redux'
import { resetSelectRestaurant } from '../redux/actions/restaurants.actions'
import ReactPlayer from 'react-player'
import { kebabCase, pick } from 'lodash'
import ReduxState from '../redux/state'

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
    <div>
      <div onClick={ () => {
        props.goToAction('/')
        props.resetSelectRestaurantAction()
      } }>
        Go back to map
      </div>
      <h1>RESTAURANT</h1>
      <ReactPlayer
        url={ `https://storage.cloud.google.com/pizzame/${ kebabCase(props.selectedRestaurant.name) }.webm` }
        loop
        width="100vw"
        height="100vh"
        playing
      />
    </div>
  )
}

export default withStore(RestaurantView)
