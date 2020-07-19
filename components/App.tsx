import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import React from 'react'

import { getPatternValue, RESTAURANT_PATH, urlMatchesPattern } from '../paths'
import { selectRestaurantBySlug } from '../redux/actions/restaurants.actions'
import ReduxState from '../redux/state'
import PizzaView from './PizzaView'
import RestaurantView from './Restaurant'
import { mainSurface, pageSurface } from '../styles/surfaces'
import Appbar from './Appbar'
import Cart from './Cart'

type AppStore = Pick<ReduxState, 'selectedRestaurant'>

interface AppActions {
  selectRestaurantBySlugAction: typeof selectRestaurantBySlug
}

type AppProps = AppActions & AppStore

const connector = (state: ReduxState): AppStore =>
  pick(state, ['selectedRestaurant'])

const actions: AppActions = {
  selectRestaurantBySlugAction: selectRestaurantBySlug,
}

const withStore = connect(connector, actions)

const App: React.FC<AppProps> = (props) => {
  React.useEffect(() => {
    if (urlMatchesPattern(location.pathname, RESTAURANT_PATH)) {
      const slug = getPatternValue(
        location.pathname,
        RESTAURANT_PATH,
        'restaurantName'
      )
      props.selectRestaurantBySlugAction(slug)
    }
  }, [props])

  return (
    <div>
      <Appbar />
      <div className={mainSurface(Boolean(props.selectedRestaurant))}>
        <PizzaView />
        <div className={pageSurface}>
          <Switch>
            {props.selectedRestaurant && (
              <Route
                path="/restaurants/:restaurantName"
                exact
                component={RestaurantView}
              />
            )}
          </Switch>
        </div>
      </div>
      <Cart />
    </div>
  )
}

export default compose(withStore)(App)
