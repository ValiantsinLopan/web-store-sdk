/* eslint-disable no-unused-vars */
import { SET_REGISTERED_FLAG } from 'src/constants';
import createReducer from 'src/lib/createReducer';

export default createReducer(
  {
    subscriptionRegistered: false,
  },
  {
    SET_REGISTERED_FLAG: state => ({
      ...state,
      subscriptionRegistered: true,
    }),
  },
);
