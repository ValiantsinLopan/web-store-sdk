/* eslint-disable no-unused-vars */
import {
  SET_CHECKOUT_STEPS,
  NEXT_CHECKOUT_STEP,
  PREVIOUS_CHECKOUT_STEP,
  GO_TO_CHECKOUT_STEP,
} from 'src/constants';

export function setCheckoutSteps(steps) {
  return {
    type: SET_CHECKOUT_STEPS,
    payload: steps,
  };
}

export function nextStep() {
  return {
    type: NEXT_CHECKOUT_STEP,
  };
}

export function previousStep() {
  return {
    type: PREVIOUS_CHECKOUT_STEP,
  };
}

export function goToStep(name) {
  return {
    type: GO_TO_CHECKOUT_STEP,
    payload: name,
  };
}
