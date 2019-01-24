import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import Login from '../Login';

jest.mock('./../../../../config/config.client', () => ({
  checkoutSteps: ['login'],
}));

describe('<Login/>', () => {
  const renderComponent = renderComponentWithLabeling(Login.WrappedComponent);
  const props = {
    onSuccessfulLogin: jest.fn(),
    goToStep: jest.fn(),
  };

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent(props);
      expect(wrapper.exists('LocalLogin')).toBe(true);
      expect(wrapper.exists('Button')).toBe(true);
    });
  });
  describe('@methods', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it('successfulLogin should call onSuccessfulLogin', () => {
      const { instance } = renderComponent(props);
      const token = '1234';
      instance.successfulLogin(token);
      expect(instance.props.onSuccessfulLogin).toHaveBeenCalledTimes(1);
      expect(instance.props.onSuccessfulLogin).toHaveBeenCalledWith(token);
    });
    it('goToRegister should call goToStep', () => {
      const { instance } = renderComponent(props);
      instance.goToRegister();
      expect(instance.props.goToStep).toHaveBeenCalledTimes(1);
      expect(instance.props.goToStep).toHaveBeenCalledWith('register');
    });
  });
});
