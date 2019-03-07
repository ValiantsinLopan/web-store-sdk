import { combineReducers } from 'redux';
<<<<<<< HEAD
import user from './userReducer';
=======
import access from './accessReducer';
import user from './userReducer';
import offer from './offerReducer';
>>>>>>> release
import runtime from './runtimeReducer';
import checkoutState from './checkoutStateReducer';

export default combineReducers({
<<<<<<< HEAD
  user,
  runtime,
  checkoutState,
=======
  checkoutState,
  user,
  offer,
  access,
  runtime,
>>>>>>> release
});
