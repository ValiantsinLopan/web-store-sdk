import { SET_RUNTIME_VARIABLE } from 'src/constants';
import * as actions from '../runtimeActions';

describe('Runtime Actions', () => {
  it('setCheckoutSteps(steps)', () => {
    const name = 'some name';
    const value = 'some value';
    expect(actions.setRuntimeVariable({ name, value })).toEqual({
      type: SET_RUNTIME_VARIABLE,
      payload: {
        name,
        value,
      },
    });
  });
});
