/* eslint-disable no-unused-vars */
<<<<<<< HEAD
import { SET_CUSTOMER_TOKEN, SET_USER_DETAILS, LOGOUT } from 'src/constants';
=======
import {
  SET_CUSTOMER_TOKEN,
  SET_USER_DETAILS,
  SET_TEMP_EMAIL,
  SET_USER_EMAIL,
} from 'src/constants';
>>>>>>> release

import Authentication from 'src/services/authentication';

import { offerId } from 'src/config/config.client';
import { goToStep } from './checkoutStateActions';

export function setCustomerToken(customerToken) {
  return {
    type: SET_CUSTOMER_TOKEN,
    payload: customerToken,
  };
}

export function setUserDetails(data) {
  return {
    type: SET_USER_DETAILS,
    payload: data,
  };
}

<<<<<<< HEAD
=======
export function setTempEmail(data) {
  return {
    type: SET_TEMP_EMAIL,
    payload: data,
  };
}

export function setUserEmail(email) {
  return {
    type: SET_USER_EMAIL,
    payload: email,
  };
}

>>>>>>> release
export const getUserDetails = customerToken => async dispatch => {
  const data = await Authentication.getUser({ customerToken });
  dispatch(setUserDetails(data));
};

<<<<<<< HEAD
export const onSuccessfulLogin = token => dispatch => {
=======
export const onSuccessfulLogin = (token, email) => dispatch => {
>>>>>>> release
  dispatch(setCustomerToken(token));
  dispatch(getUserDetails(token));

  CleengApi.getAccessStatus(offerId, result => {
    if (result.accessGranted) {
      dispatch(goToStep('alreadyGranted'));
    } else {
<<<<<<< HEAD
=======
      dispatch(setUserEmail(email));
>>>>>>> release
      dispatch(goToStep('offerDetails'));
    }
  });
};
