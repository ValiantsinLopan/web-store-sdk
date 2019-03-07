import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
<<<<<<< HEAD
=======
import SocialLogins from 'src/components/common/SocialLogins';
>>>>>>> release
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
<<<<<<< HEAD
=======
      expect(wrapper.find(SocialLogins).length).toBe(1);
>>>>>>> release
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
<<<<<<< HEAD
      instance.successfulLogin(token);
      expect(instance.props.onSuccessfulLogin).toHaveBeenCalledTimes(1);
      expect(instance.props.onSuccessfulLogin).toHaveBeenCalledWith(token);
=======
      const email = 'john@example.com';
      instance.successfulLogin(token, email);
      expect(instance.props.onSuccessfulLogin).toHaveBeenCalledTimes(1);
      expect(instance.props.onSuccessfulLogin).toHaveBeenCalledWith(
        token,
        email,
      );
>>>>>>> release
    });
    it('goToRegister should call goToStep', () => {
      const { instance } = renderComponent(props);
      instance.goToLogin();
      expect(instance.props.goToStep).toHaveBeenCalledTimes(1);
      expect(instance.props.goToStep).toHaveBeenCalledWith('login');
    });
  });
});
