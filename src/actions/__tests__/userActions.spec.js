import * as actions from '../userActions';
import {
  SET_CUSTOMER_TOKEN,
  SET_USER_DETAILS,
  GO_TO_CHECKOUT_STEP,
} from '../../constants';

import { getUser } from '../../services/authentication';

import { mockStoreCreator } from './../../../test/helpers/getMockStore';

jest.mock('./../../config/config.client', () => ({
  offerId: '123456',
}));
jest.mock('../../services/authentication', () => ({
  getUser: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ data: { email: 'john@example.com' } });
      }),
  ),
}));

describe('User Actions', () => {
  const store = mockStoreCreator();
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });
  it('setCustomerToken(token)', () => {
    const token = '1234abc';
    expect(actions.setCustomerToken(token)).toEqual({
      type: 'SET_CUSTOMER_TOKEN',
      payload: token,
    });
  });
  it('setUserDetails(data)', () => {
    const data = {
      email: 'john@example.com',
    };
    expect(actions.setUserDetails(data)).toEqual({
      type: 'SET_USER_DETAILS',
      payload: data,
    });
  });
  describe('onSuccessfulLogin(token)', () => {
    it('should go to last step if access already granted', done => {
      global.CleengApi = {
        getAccessStatus: jest.fn().mockImplementation((offer, cb) => {
          cb({ accessGranted: true });
        }),
      };
      const token = '1234abc';
      store.dispatch(actions.onSuccessfulLogin(token));
      setImmediate(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(3);
        expect(dispatchedActions[0]).toEqual({
          payload: token,
          type: SET_CUSTOMER_TOKEN,
        });
        expect(dispatchedActions[1]).toEqual({
          type: GO_TO_CHECKOUT_STEP,
          payload: 'alreadyGranted',
        });
        expect(dispatchedActions[2]).toEqual({
          type: SET_USER_DETAILS,
          payload: { data: { email: 'john@example.com' } },
        });
        done();
      });
    });
    it('should go to next step if access not already granted', () => {
      global.CleengApi = {
        getAccessStatus: jest.fn().mockImplementation((offer, cb) => {
          cb({ accessGranted: false });
        }),
      };
      const token = '1234abc';
      store.dispatch(actions.onSuccessfulLogin(token));
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[0]).toEqual({
        payload: token,
        type: SET_CUSTOMER_TOKEN,
      });
      expect(dispatchedActions[1]).toEqual({
        type: GO_TO_CHECKOUT_STEP,
        payload: 'offerDetails',
      });
    });
  });
  describe('getUserDetails(customerToken)', () => {
    it('should call getUsern from API and set user details', done => {
      const token = '1234abc';
      expect(getUser).not.toHaveBeenCalled();
      store.dispatch(actions.getUserDetails(token));
      setImmediate(() => {
        expect(getUser).toHaveBeenCalledTimes(1);
        expect(getUser).toHaveBeenCalledWith({ customerToken: token });
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(1);
        expect(dispatchedActions[0]).toEqual({
          type: SET_USER_DETAILS,
          payload: { data: { email: 'john@example.com' } },
        });
        done();
      });
    });
  });
});
