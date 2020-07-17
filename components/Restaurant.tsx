import React from 'react'
import { goToAction } from '../redux/actions/router.actions'
import { connect } from 'react-redux'
import { resetSelectRestaurant } from '../redux/actions/restaurants.actions'
import ReactPlayer from 'react-player'
import { kebabCase, pick } from 'lodash'
import ReduxState from '../redux/state'
import Typography from '@material-ui/core/Typography'
import MenuView from './Menu'

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
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto'
      }}
    >
      <div onClick={ () => {
        props.goToAction('/')
        props.resetSelectRestaurantAction()
      } }>
        Go back to map
      </div>
      <Typography variant="h2">
        { props.selectedRestaurant.name }
      </Typography>
      <ReactPlayer
        url={ `https://storage.cloud.google.com/pizzame/${ kebabCase(props.selectedRestaurant.name) }.webm` }
        loop
        width="100%"
        height="100%"
        playing
        style={{ width: '100vw' }}
      />
      <Typography variant="h3">
        Menu
      </Typography>
      <MenuView />
    </div>
  )
}

export default withStore(RestaurantView)
