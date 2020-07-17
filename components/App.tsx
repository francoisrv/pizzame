import { pick } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { getPatternValue, RESTAURANT_PATH, urlMatchesPattern } from '../paths'
import { selectRestaurantBySlug } from '../redux/actions/restaurants.actions'
import ReduxState from '../redux/state'
import PizzaView from './PizzaView'
import RestaurantView from './Restaurant'

type AppStore =
& Pick<ReduxState, "mapHeight">
& Pick<ReduxState, "selectedRestaurant">

interface AppActions {
  selectRestaurantBySlugAction: typeof selectRestaurantBySlug
}

type AppProps =
& AppActions
& AppStore

const connector = (state: ReduxState): AppStore => pick(state, ['mapHeight', 'selectedRestaurant'])

const actions: AppActions = {
  selectRestaurantBySlugAction: selectRestaurantBySlug
}

const withStore = connect(connector, actions)

const App: React.FC<AppProps> = props => {
  React.useEffect(() => {
    if (urlMatchesPattern(location.pathname, RESTAURANT_PATH)) {
      const slug = getPatternValue(location.pathname, RESTAURANT_PATH, 'restaurantName')
      props.selectRestaurantBySlugAction(slug)
    }
  }, [props])
  
  return (
    <div
      style={{
        position: 'relative',
        width: '200vw',
        height: '100vh',
        transform: `translateX(-${ Boolean(props.selectedRestaurant) ? '100' : '0' }vw)`,
        transition: 'all 0.5s ease-out',
        overflow: 'hidden',
        display: 'flex'
      }}
    >
      <PizzaView />
      <div style={{ width: '50%' }}>
        <Switch>
          {
            props.selectedRestaurant && (
              <Route
                path="/restaurants/:restaurantName"
                exact
                component={RestaurantView}
              />
            )
          }
        </Switch>
      </div>
    </div>
  )
}

export default compose(withStore)(App)
