import { takeLatest, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { goToAction } from '../redux/actions/router.actions'
import { ReduxActionType } from '../redux/types'

function* goToSaga(action: ReturnType<typeof goToAction>) {
  yield put(push(action.payload.link))
}

export default function* routerSagas() {
  yield takeLatest(ReduxActionType.GO_TO, goToSaga)
}