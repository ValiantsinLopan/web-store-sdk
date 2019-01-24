import { combineReducers } from 'redux';
import user from './userReducer';
import runtime from './runtimeReducer';
import checkoutState from './checkoutStateReducer';

export default combineReducers({
  user,
  runtime,
  checkoutState,
});
