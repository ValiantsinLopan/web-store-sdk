import React from 'react';
import Init from '../Init';

import testComponentHelper from './../../../../test/helpers/testComponentHelper.js';

jest.mock('../../../config/config.client', () => ({
  checkoutSteps: ['login'],
}));
jest.mock('./../../../components/containers/OfferDetails', () => () => (
  <span>OfferDetails</span>
));
jest.mock('./../../../components/containers/Login', () => () => (
  <span>Login</span>
));
jest.mock('./../../../components/containers/Register', () => () => (
  <span>Register</span>
));

describe('<Init/>', () => {
  const renderComponent = testComponentHelper(Init.WrappedComponent);
  const defaultProps = {
    setCheckoutSteps: jest.fn(),
    goToStep: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('@renders', () => {
    it('should render null if step not set', () => {
      const { wrapper } = renderComponent(defaultProps);
      expect(wrapper.html()).toBe(null);
    });
    it('should render proper component', () => {
      const { wrapper } = renderComponent({
        ...defaultProps,
        currentStep: {
          name: 'login',
        },
      });
      expect(wrapper.html()).toBe('<span>Login</span>');
    });
  });
  describe('@lifecycle', () => {
    describe('componentDidMount', () => {
      it('should set up steps and go to login', () => {
        const { instance } = renderComponent(defaultProps);
        expect(instance.props.setCheckoutSteps).toHaveBeenCalledTimes(1);
        expect(instance.props.goToStep).toHaveBeenCalledTimes(1);
        expect(instance.props.goToStep).toHaveBeenCalledWith('login');
      });
    });
  });
});
