import run, {
  Describe,
  Render,
  Expect,
  To,
  Has,
  Context as DescribeContext,
  Is,
  Trigger,
} from 'describe-react'
import React, { PropsWithChildren } from 'react'
import PizzaMarker from './PizzaMarker'
import createStore from '../redux/store'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import config from '../config'
import { previewRestaurant } from '../redux/actions/restaurants.actions'
import { Popup } from 'react-map-gl'
import { Store } from 'redux'
import { first, isFunction, Dictionary } from 'lodash'
import { Restaurant } from '../types'
import { Typography } from '@material-ui/core'

interface ReduxProviderProps {
  store: Store<any>
}

function ReduxProvider(props: PropsWithChildren<ReduxProviderProps>) {
  return (
    <DescribeContext.Consumer>
      {(ctx) => {
        ctx.state.set('redux', { store: props.store })
        return <Provider store={props.store}>{props.children}</Provider>
      }}
    </DescribeContext.Consumer>
  )
}

type DispatchProps =
  | { action: (ctx: any) => any }
  | { type: string; data?: any }

function Dispatch(props: DispatchProps) {
  return (
    <DescribeContext.Consumer>
      {(ctx) => {
        ctx.sections.push({
          label: 'Dispatch action to Redux store',
          sections: [
            {
              label: 'Dispatching',
              fn: () => {
                const redux = ctx.state.get('redux')
                if (!redux) {
                  throw new Error(
                    'Could not find a redux store in context. Did you use ReduxProvider in your Render section?'
                  )
                }
                if ('action' in props) {
                  if (!isFunction(props.action)) {
                    throw new Error('Action must be a function')
                  }
                  redux.store.dispatch(props.action(redux))
                } else if ('type' in props) {
                  redux.store.dispatch({
                    type: props.type,
                    ...props.data,
                  })
                }
              },
            },
          ],
        })
        return <div />
      }}
    </DescribeContext.Consumer>
  )
}

interface ExpectStoreProps {
  to: true
  have: true
  state: Dictionary<any>
}

function ExpectStore(props: ExpectStoreProps) {
  return (
    <DescribeContext.Consumer>
      {(ctx) => {
        ctx.sections.push({
          label: 'Expect store',
          sections: [
            {
              label: 'state',
              fn: () => {},
            },
          ],
        })
        return <div />
      }}
    </DescribeContext.Consumer>
  )
}

describe('Pizza Marker', () => {
  run(() => {
    const { store } = createStore()
    let restaurant: Restaurant | undefined
    return (
      <Describe label="Renders empty div in no previewd restaurant">
        <Render>
          <ReduxProvider store={store}>
            <ConnectedRouter history={config.history}>
              <PizzaMarker />
            </ConnectedRouter>
          </ReduxProvider>
        </Render>

        <Expect element={PizzaMarker}>
          <To
            have
            first
            child="div"
            which={[<Has no text />, <Has no children />]}
          />
        </Expect>

        <Dispatch
          action={(ctx) => {
            const { restaurants } = ctx.store.getState()
            const previewedRestaurant = first(restaurants)
            restaurant = previewedRestaurant as Restaurant
            return previewRestaurant(previewedRestaurant as Restaurant)
          }}
        />

        <ExpectStore
          to
          have
          state={() => ({ previewedRestaurant: restaurant })}
        />

        <Expect element={PizzaMarker}>
          <To
            have
            first
            child={Popup}
            which={[
              <Has
                properties={{
                  latitude: 1,
                  longitude: 2,
                }}
              />,
              <Has
                only
                child={Typography}
                which={[
                  <Has property="onClick" which={<Is a function />} />,
                  <Has text={() => (restaurant as Restaurant).name} />,
                ]}
              />,
            ]}
          />
        </Expect>

        <Trigger event="click" to element={Typography} />

        <ExpectStore
          to
          have
          state="selectedRestaurant"
          which={<Is exactly={<Call function={() => restaurant} />} />}
        />
      </Describe>
    )
  })
})
