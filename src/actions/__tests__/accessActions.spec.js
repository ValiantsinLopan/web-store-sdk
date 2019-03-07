import { SET_REGISTERED_FLAG, GO_TO_CHECKOUT_STEP } from 'src/constants';
import { mockStoreCreator } from 'test/helpers/getMockStore';
import * as actions from '../accessActions';

describe('Access Actions', () => {
  const store = mockStoreCreator();
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });
  it('setRegistered()', () => {
    expect(actions.setRegistered()).toEqual({
      type: SET_REGISTERED_FLAG,
    });
  });
  describe('subscriptionRegistered()', () => {
    it('should set registered and go to thank you page', () => {
      store.dispatch(actions.subscriptionRegistered());
      const dispatchedActions = store.getActions();
      expect(dispatchedActions.length).toBe(2);
      expect(dispatchedActions[0]).toEqual({
        type: SET_REGISTERED_FLAG,
      });
      expect(dispatchedActions[1]).toEqual({
        type: GO_TO_CHECKOUT_STEP,
        payload: 'thankYouPage',
      });
    });
  });
});
