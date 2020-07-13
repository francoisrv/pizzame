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

interface AppActions {
  selectRestaurantBySlugAction: typeof selectRestaurantBySlug
}

type AppProps =
& AppActions
& AppStore

const connector = (state: ReduxState): AppStore => pick(state, ['mapHeight'])

const actions: AppActions = {
  selectRestaurantBySlugAction: selectRestaurantBySlug
}

const withStore = connect(connector, actions)

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 100
}

const pageStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20vh',
  left: 0,
  bottom: 0,
  right: 0
}

const App: React.FC<AppProps> = props => {
  React.useEffect(() => {
    if (urlMatchesPattern(location.pathname, RESTAURANT_PATH)) {
      const slug = getPatternValue(location.pathname, RESTAURANT_PATH, 'restaurantName')
      props.selectRestaurantBySlugAction(slug)
    }
  }, [props])
  
  return (
    <div>
      <div style={{ ...style, top: -props.mapHeight }}>
        <PizzaView />
      </div>
      <div style={ pageStyle }>
        <Switch>
          <Route
            path="/restaurants/:restaurantName"
            exact
            component={RestaurantView}
          />
        </Switch>
      </div>
    </div>
  )
}

export default compose(withStore)(App)
