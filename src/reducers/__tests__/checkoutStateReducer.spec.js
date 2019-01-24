/* eslint-disable no-unused-vars */
import {
  SET_CHECKOUT_STEPS,
  NEXT_CHECKOUT_STEP,
  PREVIOUS_CHECKOUT_STEP,
  GO_TO_CHECKOUT_STEP,
} from 'src/constants';
import testReducer from '../checkoutStateReducer';

describe('Checkout State Reducer', () => {
  const initialState = {};

  describe('SET_CHECKOUT_STEPS', () => {
    it('should set steps and set first one as a current', () => {
      const steps = ['step1', 'step2'];
      expect(
        testReducer(initialState, {
          type: 'SET_CHECKOUT_STEPS',
          payload: steps,
        }),
      ).toEqual({
        ...initialState,
        checkoutSteps: [{ name: 'step1' }, { name: 'step2' }],
        currentStep: { name: 'step1' },
      });
    });
    it('should update steps and set first one as a current', () => {
      const steps = ['step3', 'step4'];
      expect(
        testReducer(
          {
            checkoutSteps: [{ name: 'step1' }, { name: 'step2' }],
            currentStep: { name: 'step2' },
          },
          {
            type: 'SET_CHECKOUT_STEPS',
            payload: steps,
          },
        ),
      ).toEqual({
        ...initialState,
        checkoutSteps: [{ name: 'step3' }, { name: 'step4' }],
        currentStep: { name: 'step3' },
      });
    });
  });

  describe('NEXT_CHECKOUT_STEP', () => {
    const state = {
      checkoutSteps: [{ name: 'step1' }, { name: 'step2' }],
      currentStep: { name: 'step1' },
    };
    it('should move to next step', () => {
      expect(
        testReducer(state, {
          type: 'NEXT_CHECKOUT_STEP',
        }),
      ).toEqual({
        ...state,
        currentStep: { name: 'step2' },
      });
    });
    it('should move to first step if last one', () => {
      expect(
        testReducer(
          {
            ...state,
            currentStep: { name: 'step2' },
          },
          {
            type: 'NEXT_CHECKOUT_STEP',
          },
        ),
      ).toEqual({
        ...state,
        currentStep: { name: 'step1' },
      });
    });
  });

  describe('PREVIOUS_CHECKOUT_STEP', () => {
    const state = {
      checkoutSteps: [{ name: 'step1' }, { name: 'step2' }],
      currentStep: { name: 'step2' },
    };
    it('should move to prev step', () => {
      expect(
        testReducer(state, {
          type: 'PREVIOUS_CHECKOUT_STEP',
        }),
      ).toEqual({
        ...state,
        currentStep: { name: 'step1' },
      });
    });
    it('should not move if first step', () => {
      expect(
        testReducer(
          {
            ...state,
            currentStep: { name: 'step1' },
          },
          {
            type: 'PREVIOUS_CHECKOUT_STEP',
          },
        ),
      ).toEqual({
        ...state,
        currentStep: { name: 'step1' },
      });
    });
  });

  describe('GO_TO_CHECKOUT_STEP', () => {
    const state = {
      checkoutSteps: [
        { name: 'step1' },
        { name: 'step2' },
        { name: 'step3' },
        { name: 'step4' },
      ],
      currentStep: { name: 'step2' },
    };
    it('should move passed step', () => {
      expect(
        testReducer(state, {
          type: 'GO_TO_CHECKOUT_STEP',
          payload: 'step4',
        }),
      ).toEqual({
        ...state,
        currentStep: { name: 'step4' },
      });
    });
  });
});
