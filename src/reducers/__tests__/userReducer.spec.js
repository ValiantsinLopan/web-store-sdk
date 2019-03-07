import {
  SET_CUSTOMER_TOKEN,
  LOGOUT,
  SET_USER_DETAILS,
  SET_CONSENTS,
  SET_TEMP_EMAIL,
  SET_USER_EMAIL,
} from 'src/constants';
import testReducer from '../userReducer';

const mockConsentResponse = {
  terms: {
    broadcasterId: 0,
    name: 'terms',
    version: '1',
    value: 'https://cleeng.com/legal',
    label:
      'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
    required: true,
  },
};

describe('User Reducer', () => {
  const initialState = {};

  describe('SET_CUSTOMER_TOKEN', () => {
    it('should set passed token', () => {
      const token = '1224';
      expect(
        testReducer(initialState, {
          type: SET_CUSTOMER_TOKEN,
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
            type: SET_CUSTOMER_TOKEN,
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
            type: LOGOUT,
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
          {
            tempEmail: 'john@example.com',
          },
          {
            type: SET_USER_DETAILS,
            payload: data,
          },
        ),
      ).toEqual({
        ...data,
        tempEmail: null,
      });
    });
  });
  describe('SET_TEMP_EMAIL', () => {
    it('should set temp email', () => {
      const email = 'john@example.com';
      expect(
        testReducer(
          {},
          {
            type: SET_TEMP_EMAIL,
            payload: email,
          },
        ),
      ).toEqual({
        tempEmail: email,
      });
    });
  });
  describe('SET_USER_EMAIL', () => {
    it('should set passed user data', () => {
      const email = 'john@example.com';
      expect(
        testReducer(
          {},
          {
            type: SET_USER_EMAIL,
            payload: email,
          },
        ),
      ).toEqual({ email });
    });
  });
  describe('SET_CONSENTS', () => {
    it('should set consents definitions', () => {
      expect(
        testReducer(
          {},
          {
            type: SET_CONSENTS,
            payload: mockConsentResponse,
          },
        ),
      ).toEqual(mockConsentResponse);
    });
  });
});
