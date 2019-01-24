/* eslint-disable no-unused-vars */
import { SET_CUSTOMER_TOKEN, LOGOUT, SET_USER_DETAILS } from 'src/constants';
import testReducer from '../userReducer';

describe('User Reducer', () => {
  const initialState = {};

  describe('SET_CUSTOMER_TOKEN', () => {
    it('should set passed token', () => {
      const token = '1224';
      expect(
        testReducer(initialState, {
          type: 'SET_CUSTOMER_TOKEN',
          payload: token,
        }),
      ).toEqual({
        ...initialState,
        customerToken: token,
      });
    });
    it('should update passed token', () => {
      const token = '1224';
      expect(
        testReducer(
          { customerToken: '4321' },
          {
            type: 'SET_CUSTOMER_TOKEN',
            payload: token,
          },
        ),
      ).toEqual({
        ...initialState,
        customerToken: token,
      });
    });
  });
  describe('LOGOUT', () => {
    it('should reset token', () => {
      expect(
        testReducer(
          { customerToken: '4321' },
          {
            type: 'LOGOUT',
          },
        ),
      ).toEqual({
        ...initialState,
        customerToken: false,
      });
    });
  });
  describe('SET_USER_DETAILS', () => {
    it('should set passed user data', () => {
      const data = {
        email: 'john@example.com',
        currency: 'EUR',
      };
      expect(
        testReducer(
          {},
          {
            type: 'SET_USER_DETAILS',
            payload: data,
          },
        ),
      ).toEqual(data);
    });
  });
});
