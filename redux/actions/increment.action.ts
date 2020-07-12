import { ReduxActionType } from "../types";

/**
 * Redux action to increment counter
 */
const incrementAction = () => ({
  type: ReduxActionType.INCREMENT as ReduxActionType.INCREMENT,
  payload: {}
})

export default incrementAction
