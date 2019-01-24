/* eslint-disable no-unused-vars */
import { SET_CUSTOMER_TOKEN, SET_USER_DETAILS, LOGOUT } from 'src/constants';

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

export const getUserDetails = customerToken => async dispatch => {
  const data = await Authentication.getUser({ customerToken });
  dispatch(setUserDetails(data));
};

export const onSuccessfulLogin = token => dispatch => {
  dispatch(setCustomerToken(token));
  dispatch(getUserDetails(token));

  CleengApi.getAccessStatus(offerId, result => {
    if (result.accessGranted) {
      dispatch(goToStep('alreadyGranted'));
    } else {
      dispatch(goToStep('offerDetails'));
    }
  });
};
