/* eslint-disable no-unused-vars */
<<<<<<< HEAD
import { SET_CUSTOMER_TOKEN, LOGOUT, SET_USER_DETAILS } from 'src/constants';
=======
import {
  SET_CUSTOMER_TOKEN,
  LOGOUT,
  SET_USER_DETAILS,
  SET_CONSENTS,
  SET_TEMP_EMAIL,
  SET_USER_EMAIL,
} from 'src/constants';
>>>>>>> release
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
<<<<<<< HEAD
=======
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
>>>>>>> release
    }),
  },
);
