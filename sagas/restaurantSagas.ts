import { find, kebabCase, startCase } from 'lodash'
import { takeLatest, put, select, call } from 'redux-saga/effects'
import Geopoint from 'geo-point'
import { RESTAURANT_PATH } from '../paths'
import { setCoords, setMapHeight } from '../redux/actions/map.actions'
import { selectRestaurant, selectRestaurantBySlug } from '../redux/actions/restaurants.actions'
import { goToAction } from '../redux/actions/router.actions'
import { ReduxActionType } from '../redux/types'
import GeoPoint from 'geo-point'

const TOP = 51.5060951
const BOTTOM = 51.5259000
const HALF = TOP - ((TOP - BOTTOM) / 2)
const CENTER = 1500

function positionMapForRestaurantSelection(
  mapTop: number,
  restaurantLatitude: number,
  distanceFromTop: number
) {
  const restaurantDistanceFromTop = new GeoPoint(restaurantLatitude, 0).calculateDistance(new Geopoint(mapTop, 0))
  console.log(restaurantDistanceFromTop)
  const nextY = new GeoPoint(restaurantLatitude, 0).calculateDestination(0, restaurantDistanceFromTop)
  console.log(nextY)
}

let i = 0.000001

async function wait() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

function* selectRestaurantSaga(action: ReturnType<typeof selectRestaurant>) {
  const restaurantLatitude = action.payload.restaurant.latitude
  const restaurantLongitude = action.payload.restaurant.longitude
  const [mapLatitude, mapLongitude] = yield select(state => state.coords)
  console.log({ mapLatitude })
  const distanceFromTop = TOP - restaurantLatitude
  yield put(setCoords([
    TOP,
    action.payload.restaurant.longitude
  ]))
  i += 0.000001
  yield call(wait)
  // yield put(selectRestaurant(action.payload.restaurant))
  // yield put(setMapHeight(50))
  // yield put(goToAction(RESTAURANT_PATH, { params: { restaurantName: kebabCase(action.payload.restaurant.name) } }))
}

function* selectRestaurantBySlugSaga(action: ReturnType<typeof selectRestaurantBySlug>) {
  const { slug } = action.payload
  const name = startCase(slug)
  const restaurants = yield select(state => state.restaurants)
  const restaurant = find(restaurants, { name })
  if (restaurant) {
    yield put(selectRestaurant(restaurant))
  }
}

export default function* restaurantsSagas() {
  yield takeLatest(ReduxActionType.SELECT_RESTAURANT, selectRestaurantSaga)
  yield takeLatest(ReduxActionType.SELECT_RESTAURANT_BY_SLUG, selectRestaurantBySlugSaga)
}
