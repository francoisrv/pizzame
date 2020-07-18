import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import ReduxState from '../redux/state'
import { pick } from 'lodash'
import { connect } from 'react-redux'

type AppbarStore =
& Pick<ReduxState, "cart">

type AppbarProps =
& AppbarStore

const connector = (state: ReduxState): AppbarStore => pick(state, ['cart'])

const withStore = connect(connector)

const Appbar: React.FC<AppbarProps> = props => (
  <AppBar position="static">
    <Toolbar>
      <div style={{ flex: 1 }}>
        <Typography>pizza by london</Typography>
      </div>
      <div>
        <IconButton>
          <Badge badgeContent={ props.cart.length } color="secondary">
            <AddShoppingCartIcon style={{ color: 'white' }} />
          </Badge>
        </IconButton>
      </div>
    </Toolbar>
  </AppBar>
)

export default withStore(Appbar)
