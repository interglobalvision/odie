/**
 * Combine All Reducers
 */
import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'

import { loadingStatusReducer } from './reducers/loadingStatusReducer';

const appReducer = combineReducers({
  firebase: firebaseStateReducer,
  loadingStatus: loadingStatusReducer,
})

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
}

export default rootReducer;
