/* eslint-disable no-unused-vars */
import { SET_RUNTIME_VARIABLE } from 'src/constants';
import testReducer from '../runtimeReducer';

describe('Runtime Reducer', () => {
  const initialState = {};

  describe('SET_RUNTIME_VARIABLE', () => {
    it('should set passed value in name key', () => {
      const payload = {
        name: 'initial',
        value: 1234,
      };
      expect(
        testReducer(initialState, {
          type: 'SET_RUNTIME_VARIABLE',
          payload,
        }),
      ).toEqual({
        ...initialState,
        initial: 1234,
      });
    });
  });
});
