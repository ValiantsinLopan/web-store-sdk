import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
<<<<<<< HEAD
import Login from '../Login';

jest.mock('./../../../../config/config.client', () => ({
=======
import LocalLogin from 'src/components/containers/LocalLogin';
import Button from 'src/components/common/Button';
import SocialLogins from 'src/components/common/SocialLogins';
import Login from '../Login';

jest.mock('src/config/config.client', () => ({
>>>>>>> release
  checkoutSteps: ['login'],
}));

describe('<Login/>', () => {
  const renderComponent = renderComponentWithLabeling(Login.WrappedComponent);
<<<<<<< HEAD
  const props = {
    onSuccessfulLogin: jest.fn(),
    goToStep: jest.fn(),
=======
  const onSuccessfulLoginMock = jest.fn();
  const goToStepMock = jest.fn();
  const props = {
    onSuccessfulLogin: onSuccessfulLoginMock,
    goToStep: goToStepMock,
>>>>>>> release
  };

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent(props);
<<<<<<< HEAD
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
=======
      expect(wrapper.exists('Button')).toBe(true);
      expect(wrapper.exists('LocalLogin')).toBe(true);
      expect(wrapper.find(SocialLogins).length).toBe(1);
    });
  });
  describe('@events', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    describe('on success in LocalLogin', () => {
      it('should call onSuccessfulLogin with token', () => {
        const { instance } = renderComponent(props);
        const token = '1234';
        const email = 'john@example.com';
        instance.successfulLogin(token, email);
        expect(instance.props.onSuccessfulLogin).toHaveBeenCalledTimes(1);
        expect(instance.props.onSuccessfulLogin).toHaveBeenCalledWith(
          token,
          email,
        );
      });
    });
    describe('on go to register button click', () => {
      it('should go to Register step', () => {
        const { wrapper } = renderComponent(props);
        wrapper
          .find(Button)
          .first()
          .props()
          .onClickFn();
        expect(goToStepMock).toHaveBeenCalledTimes(1);
        expect(goToStepMock).toHaveBeenCalledWith('register');
      });
    });
    describe('on go to reset password button click', () => {
      it('should go to reset password step', () => {
        const setTempEmailMock = jest.fn();
        const email = 'john@example.com';
        const { wrapper } = renderComponent({
          ...props,
          setTempEmail: setTempEmailMock,
        });
        wrapper.setState({ email });
        wrapper
          .find(Button)
          .at(1)
          .props()
          .onClickFn();
        expect(setTempEmailMock).toHaveBeenCalledTimes(1);
        expect(setTempEmailMock).toHaveBeenCalledWith(email);
        expect(goToStepMock).toHaveBeenCalledTimes(1);
        expect(goToStepMock).toHaveBeenCalledWith('passwordReset');
      });
    });
    describe('on email input change in LocalLogin', () => {
      it('should set email in state', () => {
        const email = 'john@example.com';
        const { wrapper } = renderComponent(props);
        wrapper
          .find(LocalLogin)
          .props()
          .onEmailChange(email);
        expect(wrapper.state().email).toBe(email);
      });
>>>>>>> release
    });
  });
});
