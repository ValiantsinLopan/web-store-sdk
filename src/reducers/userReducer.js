/* eslint-disable no-unused-vars */
import { SET_CUSTOMER_TOKEN, LOGOUT, SET_USER_DETAILS } from 'src/constants';
import createReducer from 'src/lib/createReducer';

export default createReducer(
  {},
  {
    SET_CUSTOMER_TOKEN: (state, { payload }) => ({
      ...state,
      customerToken: payload,
    }),
    LOGOUT: state => ({
      ...state,
      customerToken: false,
    }),
    SET_USER_DETAILS: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
);
