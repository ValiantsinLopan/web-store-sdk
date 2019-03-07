import { SET_OFFER, SET_TRIAL, SET_PRICE } from 'src/constants';

export function setOfferDetails(data) {
  return {
    type: SET_OFFER,
    payload: data,
  };
}

export function setPrice(data) {
  return {
    type: SET_PRICE,
    payload: data,
  };
}

export function setTrial() {
  return {
    type: SET_TRIAL,
  };
}
