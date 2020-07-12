import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import createStore from './store'

const { persistor, store } = createStore()

interface ReactReduxProviderProps {
  children: React.ReactNode
  loading?: React.ReactNode
}

const ReactReduxProvider: React.SFC<ReactReduxProviderProps> = props => (
  <Provider store={ store }>
    <PersistGate loading={ props.loading } persistor={ persistor }>
      { props.children }
    </PersistGate>
  </Provider>
)

ReactReduxProvider.defaultProps = {
  loading: null
}

export default ReactReduxProvider
