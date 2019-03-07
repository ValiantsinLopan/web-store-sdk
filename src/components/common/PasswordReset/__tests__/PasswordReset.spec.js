import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import { resetPassword } from 'src/services/authentication';
import EmailInput from 'src/components/common/EmailInput/EmailInput';
import Button from 'src/components/common/Button';
import PasswordReset from '../PasswordReset';

jest.mock('src/services/authentication', () => ({
  resetPassword: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ success: true });
      }),
  ),
}));

describe('<PasswordReset/>', () => {
  const renderComponent = renderComponentWithLabeling(PasswordReset);

  describe('@renders', () => {
    it('should have basic elements', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.find('.title').length).toBe(1);
      expect(wrapper.find('.subtitle').length).toBe(1);
      expect(wrapper.find(EmailInput).length).toBe(1);
      expect(wrapper.find('Button.passwordResetButton').length).toBe(1);
      expect(wrapper.find('.circleLoader').length).toBe(0);
    });
    it('should render confirmation elements when sent', () => {
      const { wrapper } = renderComponent();
      wrapper.setState({
        sent: true,
      });
      expect(wrapper.find('.circleLoader').length).toBe(1);
      expect(wrapper.find('.sentTitle').length).toBe(1);
      expect(wrapper.find('Button.passwordGoBackButton').length).toBe(1);
      expect(wrapper.find('.title').length).toBe(0);
      expect(wrapper.find(EmailInput).length).toBe(0);
      expect(wrapper.find('Button.passwordResetButton').length).toBe(0);
    });
  });
  describe('@lifecycle', () => {
    describe('constructor', () => {
      it('should set default state values', () => {
        const { wrapper } = renderComponent();
        expect(wrapper.state().email).toBe('');
        expect(wrapper.state().error).toBe('');
        expect(wrapper.state().sent).toBe(false);
      });
      it('should set passed email in state', () => {
        const email = 'john@example.com';
        const { wrapper } = renderComponent({
          email,
        });
        expect(wrapper.state().email).toBe(email);
      });
    });
  });
  describe('@events', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    describe('on sent password button click', () => {
      it('should call resetPassword and set sent when validation passes', done => {
        const onSuccessMock = jest.fn();
        const email = 'john@example.com';
        const { wrapper } = renderComponent({
          onSuccess: onSuccessMock,
        });
        wrapper.setState({
          email,
        });
        expect(resetPassword).not.toHaveBeenCalled();
        wrapper
          .find(Button)
          .props()
          .onClickFn();
        expect(resetPassword).toHaveBeenCalledTimes(1);
        expect(resetPassword).toHaveBeenCalledWith({ email });
        setImmediate(() => {
          expect(onSuccessMock).toHaveBeenCalledTimes(1);
          expect(wrapper.state().sent).toBe(true);
          done();
        });
      });
      it('should call resetPassword but not set sent if not success returned', done => {
        const onSuccessMock = jest.fn();
        const email = 'john@example.com';
        const { wrapper } = renderComponent({
          onSuccess: onSuccessMock,
        });
        resetPassword.mockImplementationOnce(
          () =>
            new Promise(resolve => {
              resolve({ success: false });
            }),
        );
        wrapper.setState({
          email,
        });
        expect(resetPassword).not.toHaveBeenCalled();
        wrapper
          .find(Button)
          .props()
          .onClickFn();
        expect(resetPassword).toHaveBeenCalledTimes(1);
        expect(resetPassword).toHaveBeenCalledWith({ email });
        setImmediate(() => {
          expect(onSuccessMock).not.toHaveBeenCalled();
          expect(wrapper.state().sent).toBe(false);
          done();
        });
      });
      it('should not call resetPassword email not present', () => {
        const onSuccessMock = jest.fn();
        const { wrapper } = renderComponent({
          onSuccess: onSuccessMock,
        });
        expect(resetPassword).not.toHaveBeenCalled();
        wrapper
          .find(Button)
          .props()
          .onClickFn();
        expect(resetPassword).not.toHaveBeenCalled();
        expect(wrapper.state().error).toBe('Please fill out this field.');
      });
      it('should not call resetPassword email in bad format', () => {
        const onSuccessMock = jest.fn();
        const { wrapper } = renderComponent({
          onSuccess: onSuccessMock,
        });
        wrapper.setState({
          email: 'john',
        });
        expect(resetPassword).not.toHaveBeenCalled();
        wrapper
          .find(Button)
          .props()
          .onClickFn();
        expect(resetPassword).not.toHaveBeenCalled();
        expect(wrapper.state().error).toBe(
          'The email address is not properly formatted.',
        );
      });
      it('should set error when not successful resetPassword call', () => {
        const onSuccessMock = jest.fn();
        const { wrapper } = renderComponent({
          onSuccess: onSuccessMock,
        });
        wrapper.setState({
          email: 'john',
        });
        const errorMock = { code: 2, message: 'errorMessage' };
        resetPassword.mockImplementationOnce(
          () =>
            new Promise((resolve, reject) => {
              reject(errorMock);
            }),
        );
        wrapper
          .find(Button)
          .props()
          .onClickFn()
          .catch(result => {
            expect(onSuccessMock).not.toHaveBeenCalled();
            expect(result).toEqual(errorMock);
          });
      });
    });
    describe('on input change', () => {
      it('should set value to state', () => {
        const { wrapper } = renderComponent();
        const inputValue = 'sth';
        wrapper
          .find(EmailInput)
          .props()
          .onChangeFn(inputValue);
        expect(wrapper.state().email).toBe(inputValue);
      });
    });
  });
});
