import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import LocalLogin from 'src/components/containers/LocalLogin';
import Button from 'src/components/common/Button';
import SocialLogins from 'src/components/common/SocialLogins';
import Login from '../Login';

jest.mock('src/config/config.client', () => ({
  checkoutSteps: ['login'],
}));

describe('<Login/>', () => {
  const renderComponent = renderComponentWithLabeling(Login.WrappedComponent);
  const onSuccessfulLoginMock = jest.fn();
  const goToStepMock = jest.fn();
  const props = {
    onSuccessfulLogin: onSuccessfulLoginMock,
    goToStep: goToStepMock,
  };

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent(props);
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
    });
  });
});
