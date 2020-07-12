import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import PizzaView from './components/PizzaView'
import createStore from './redux/store'

const { store } = createStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <PizzaView />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)
