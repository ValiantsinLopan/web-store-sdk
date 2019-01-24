import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import Register from '../Register';

jest.mock('./../../../../config/config.client', () => ({
  checkoutSteps: ['register'],
}));

describe('<Register/>', () => {
  const renderComponent = renderComponentWithLabeling(
    Register.WrappedComponent,
  );
  const props = {
    onSuccessfulLogin: jest.fn(),
    goToStep: jest.fn(),
  };

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent(props);
      expect(wrapper.exists('LocalRegister')).toBe(true);
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
      instance.goToLogin();
      expect(instance.props.goToStep).toHaveBeenCalledTimes(1);
      expect(instance.props.goToStep).toHaveBeenCalledWith('login');
    });
  });
});
