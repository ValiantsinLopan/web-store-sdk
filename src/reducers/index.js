import { combineReducers } from 'redux';
import access from './accessReducer';
import user from './userReducer';
import offer from './offerReducer';
import runtime from './runtimeReducer';
import checkoutState from './checkoutStateReducer';

export default combineReducers({
  checkoutState,
  user,
  offer,
  access,
  runtime,
});
