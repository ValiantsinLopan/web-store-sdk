import { SET_REGISTERED_FLAG } from 'src/constants';
import { getMockStoreWithInitialReduxState } from 'test/helpers/getMockStore';
import testReducer from '../accessReducer';

describe('Access Reducer', () => {
  const initialState = {
    subscriptionRegistered: false,
  };

  it('Default values', () => {
    const state = getMockStoreWithInitialReduxState().getState();
    expect(state.access.subscriptionRegistered).toBe(false);
  });

  describe('SET_REGISTERED_FLAG', () => {
    it('should set subscriptionRegistered', () => {
      expect(
        testReducer(initialState, {
          type: SET_REGISTERED_FLAG,
        }),
      ).toEqual({
        ...initialState,
        subscriptionRegistered: true,
      });
    });
  });
});
