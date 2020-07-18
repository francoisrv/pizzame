import { style } from 'typestyle'

export function mainSurface(thereIsASelectedRestaurant: boolean) {
  return style({
    position: 'relative',
    width: '200vw',
    height: 'calc(100vh - 64px)',
    transform: `translateX(-${ thereIsASelectedRestaurant ? '100' : '0' }vw)`,
    transition: 'all 0.5s ease-out',
    overflow: 'hidden',
    display: 'flex'
  })
}

export const pageSurface = style({ width: '50%' })

export const menuSurface = style({
  padding: 40,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '40px 40px 0 0'
})

export const menuListWrapper = style({
  backgroundColor: 'white',
  borderLeft: '2px solid white',
  borderRight: '2px solid white'
})

export const restaurantView = style({
  height: '100vh',
  width: '100vw',
  overflow: 'auto'
})

export const restaurantHeaderStyle = style({
  position: 'fixed',
  top: 0,
  zIndex: 99,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  left: '50%',
  right: 0
})

export const restaurantInnerHeaderStyle = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 22px'
})

export const backArrowStyle = style({
  fontSize: '4em',
  color: '#ccc',
  cursor: 'pointer'
})

export const videoParallaxContainer = style({
  margin: 0,
  position: 'relative',
  height: '100%'
})

export const videoParallaxWrapper = style({
  width: '50%',
  position: 'fixed',
  top: 200,
  zIndex: -999
})
