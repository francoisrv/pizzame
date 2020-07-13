import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './components/App'

import createStore from './redux/store'
import config from './config'

const { store } = createStore()

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ config.history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
