import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import PizzaView from './components/PizzaView'
import createStore from './redux/store'

const { store } = createStore()

ReactDOM.render(
  <Provider store={ store }>
    <PizzaView />
  </Provider>,
  document.getElementById('root'),
)
