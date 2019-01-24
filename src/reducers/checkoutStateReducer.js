/* eslint-disable no-unused-vars */
import {
  SET_CHECKOUT_STEPS,
  NEXT_CHECKOUT_STEP,
  PREVIOUS_CHECKOUT_STEP,
  GO_TO_CHECKOUT_STEP,
} from 'src/constants';
import createReducer from 'src/lib/createReducer';

function mapStep(el) {
  if (typeof el === 'string') {
    return {
      name: el,
    };
  } else if (el.name) {
    return el;
  }
  return null;
}

function mapSteps(steps) {
  return steps.map(mapStep);
}

function moveBySteps(checkoutSteps = [], currentStep = null, steps = 0) {
  let currentStepObj;

  if (typeof currentStep === 'string') {
    currentStepObj = checkoutSteps.find(({ name }) => name === currentStep);
  } else if (currentStep && typeof currentStep === 'object') {
    currentStepObj = checkoutSteps.find(
      ({ name }) => name === currentStep.name,
    );
  }
  const index = checkoutSteps.indexOf(currentStepObj);
  const newIndex = index + steps;

  if (index >= 0 && newIndex < checkoutSteps.length && newIndex > 0) {
    return checkoutSteps[newIndex];
  }
  return checkoutSteps[0];
}

export default createReducer(
  {},
  {
    SET_CHECKOUT_STEPS: (state, { payload }) => ({
      ...state,
      checkoutSteps: mapSteps(payload),
      currentStep: {
        ...moveBySteps(mapSteps(payload)),
      },
    }),
    NEXT_CHECKOUT_STEP: state => ({
      ...state,
      currentStep: {
        ...moveBySteps(state.checkoutSteps, state.currentStep, 1),
      },
    }),
    PREVIOUS_CHECKOUT_STEP: state => ({
      ...state,
      currentStep: {
        ...moveBySteps(state.checkoutSteps, state.currentStep, -1),
      },
    }),
    GO_TO_CHECKOUT_STEP: (state, { payload }) => ({
      ...state,
      currentStep: {
        ...moveBySteps(state.checkoutSteps, payload, 0),
      },
    }),
  },
);
