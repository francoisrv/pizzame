import React from 'react'
import ReduxState from '../redux/state'
import { pick } from 'lodash'
import { connect } from 'react-redux'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

type MenuViewStore =
& Pick<ReduxState, 'menu'>

type MenuViewProps =
& MenuViewStore

const connector = (state: ReduxState): MenuViewStore => pick(state, ['menu'])

const withStore = connect(connector)

const MenuView: React.FC<MenuViewProps> = props => (
  <div
    style={{
      padding: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '40px 40px 0 0'
    }}
  >
    <Typography variant="h3">
      Menu
    </Typography>
    <div style={{ backgroundColor: 'white', borderLeft: '2px solid white', borderRight: '2px solid white' }}>
      <GridList
        cellHeight={210}
        cols={3}
        spacing={4}
      >
        {
          props.menu.map((pizza, index) => (
            <GridListTile key={ pizza.name } cols={ pizza.cols } rows={ pizza.rows }>
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
    </div>
  </div>
)

export default withStore(MenuView)
