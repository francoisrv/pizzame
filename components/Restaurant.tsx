import React from 'react'
import { goToAction } from '../redux/actions/router.actions'
import { connect } from 'react-redux'
import { resetSelectRestaurant } from '../redux/actions/restaurants.actions'
import ReactPlayer from 'react-player'
import { kebabCase, pick } from 'lodash'
import ReduxState from '../redux/state'
import Typography from '@material-ui/core/Typography'
import MenuView from './Menu'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Ratings from './Ratings'

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
      <header
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 99,
          backgroundColor: 'white',
          left: '50%',
          right: 0
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 22px'
          }}
        >
          <ArrowBackIosIcon
            style={{
              fontSize: '4em',
              color: '#ccc',
              cursor: 'pointer'
            }}
            onClick={ () => {
              props.goToAction('/')
              props.resetSelectRestaurantAction()
            } }
          />
          <div>
            <Typography variant="h1">
              { props.selectedRestaurant.name }
            </Typography>
            <Ratings ratings={ props.selectedRestaurant.ratings } size={4.5} />
          </div>
        </div>
      </header>
      
      <div
        style={{
          margin: 0,
          position: 'relative',
          height: '100%'
        }}
      >
        <div
          style={{
            // minWidth: '100%',
            // maxWidth: '100%',
            width: '50%',
            position: 'fixed',
            top: 200,
            // left: '42vw',
            // right: '-40vw',
            zIndex: -999
          }}
        >
          <ReactPlayer
            url={ `https://storage.cloud.google.com/pizzame/${ kebabCase(props.selectedRestaurant.name) }.webm` }
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
