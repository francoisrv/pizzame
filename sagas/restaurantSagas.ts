import { find, kebabCase, startCase } from 'lodash'
import { takeLatest, put, select } from 'redux-saga/effects'
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

function* selectRestaurantSaga(action: ReturnType<typeof selectRestaurant>) {
  const restaurantLatitude = action.payload.restaurant.latitude
  const restaurantLongitude = action.payload.restaurant.longitude
  const [mapLatitude, mapLongitude] = yield select(state => state.coords)
  const startPoint = new Geopoint(TOP, mapLongitude)
  const endPoint = new Geopoint(restaurantLatitude, mapLongitude)
  const span = startPoint.calculateDistance(new Geopoint(BOTTOM, mapLongitude))
  const distance = startPoint.calculateDistance(endPoint)
  console.log(positionMapForRestaurantSelection(TOP, restaurantLatitude, CENTER))
  yield put(setCoords([
    51.51049510000001,
    action.payload.restaurant.longitude
  ]))
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
