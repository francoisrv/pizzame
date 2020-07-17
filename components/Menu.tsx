import React from 'react'
import ReduxState from '../redux/state'
import { pick } from 'lodash'
import { connect } from 'react-redux'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'

type MenuViewStore =
& Pick<ReduxState, 'menu'>

type MenuViewProps =
& MenuViewStore

const connector = (state: ReduxState): MenuViewStore => pick(state, ['menu'])

const withStore = connect(connector)

const MenuView: React.FC<MenuViewProps> = props => (
  <GridList
    cellHeight={210}
    cols={3}
    spacing={2}
  >
    {
      props.menu.map((pizza, index) => (
        <GridListTile key={ pizza.name } cols={ pizza.cols }>
          <img src={ pizza.image } />
          <GridListTileBar
            title={ pizza.name }
            subtitle={ `€${ pizza.price }` }
            actionIcon={
              <IconButton>
                <AddShoppingCartIcon style={{ color: 'white'}} />
              </IconButton>
            }
          />
        </GridListTile>
      ))
    }
  </GridList>
)

export default withStore(MenuView)
