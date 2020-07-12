import React from 'react'
import ReduxState from '../redux/state'
import { pick } from 'lodash'
import { connect } from 'react-redux'
import { Popup } from 'react-map-gl'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

type PizzaMarkerStore =
& Pick<ReduxState, "selectedRestaurant">

const connector = (state: ReduxState): PizzaMarkerStore => pick(state, ['selectedRestaurant'])

const withStore = connect(connector)

type PizzaMarkerProps =
& PizzaMarkerStore

const PizzaMarker: React.FC<PizzaMarkerProps> = props => {
  if (!props.selectedRestaurant) {
    return <div />
  }
  return (
    <Popup
      latitude={ props.selectedRestaurant.latitude }
      longitude={ props.selectedRestaurant.longitude }
    >
      <Link href="">
        { props.selectedRestaurant.name }
      </Link>
    </Popup>
  )
}

export default withStore(PizzaMarker)
