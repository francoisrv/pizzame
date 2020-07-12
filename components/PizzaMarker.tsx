import React from 'react'
import ReduxState from '../redux/state'
import { kebabCase, pick } from 'lodash'
import { connect } from 'react-redux'
import { Popup } from 'react-map-gl'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

type PizzaMarkerStore =
& Pick<ReduxState, "selectedRestaurant">

const connector = (state: ReduxState): PizzaMarkerStore => pick(state, ['selectedRestaurant'])

const withStore = connect(connector)

type PizzaMarkerProps =
& PizzaMarkerStore
& RouteComponentProps<any>

const PizzaMarker: React.FC<PizzaMarkerProps> = props => {
  if (!props.selectedRestaurant) {
    return <div />
  }

  function goToRestaurant() {
    props.history.push(`/restaurants/${ kebabCase(props.selectedRestaurant.name) }`)
  }

  return (
    <Popup
      latitude={ props.selectedRestaurant.latitude }
      longitude={ props.selectedRestaurant.longitude }
    >
      <Typography onClick={ goToRestaurant }>
        { props.selectedRestaurant.name }
      </Typography>
    </Popup>
  )
}

export default compose(withRouter, withStore)(PizzaMarker)
