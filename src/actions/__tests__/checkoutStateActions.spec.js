import {
  SET_CHECKOUT_STEPS,
  NEXT_CHECKOUT_STEP,
  PREVIOUS_CHECKOUT_STEP,
  GO_TO_CHECKOUT_STEP,
} from 'src/constants';
import * as actions from '../checkoutStateActions';

describe('Checkout State Actions', () => {
  it('setCheckoutSteps(steps)', () => {
    const steps = ['step1', 'step2'];
    expect(actions.setCheckoutSteps(steps)).toEqual({
      type: SET_CHECKOUT_STEPS,
      payload: steps,
    });
  });
  it('nextStep()', () => {
    expect(actions.nextStep()).toEqual({
      type: NEXT_CHECKOUT_STEP,
    });
  });
  it('previousStep()', () => {
    expect(actions.previousStep()).toEqual({
      type: PREVIOUS_CHECKOUT_STEP,
    });
  });
  it('goToStep(step)', () => {
    const step = 'step1';
    expect(actions.goToStep(step)).toEqual({
      type: GO_TO_CHECKOUT_STEP,
      payload: step,
    });
  });
});
