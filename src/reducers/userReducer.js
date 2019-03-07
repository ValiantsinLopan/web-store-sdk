/* eslint-disable no-unused-vars */
import {
  SET_CUSTOMER_TOKEN,
  LOGOUT,
  SET_USER_DETAILS,
  SET_CONSENTS,
  SET_TEMP_EMAIL,
  SET_USER_EMAIL,
} from 'src/constants';
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
      tempEmail: null,
    }),
    SET_TEMP_EMAIL: (state, { payload }) => ({
      ...state,
      tempEmail: payload,
    }),
    SET_CONSENTS: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    SET_USER_EMAIL: (state, { payload }) => ({
      ...state,
      email: payload,
    }),
  },
);
