import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
<<<<<<< HEAD
import LocalAuth from '../LocalAuth';
import Button from './../../Button';
import Input from './../../Input';
import PasswordInput from './../../PasswordInput';
=======
import Button from 'src/components/common/Button';
import EmailInput from 'src/components/common/EmailInput/EmailInput';
import PasswordInput from 'src/components/common/PasswordInput';
import Consents from 'src/components/common/Consents';
import LocalAuth from '../LocalAuth';
>>>>>>> release

jest.mock('../../../../services/authentication', () => ({
  login: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ token: '1234' });
      }),
  ),
}));

<<<<<<< HEAD
=======
const mockConsent = [
  {
    name: 'name',
    version: '1',
    label: 'consent <a href=""> Terms </a>',
    required: true,
  },
];

>>>>>>> release
describe('<LocalAuth/>', () => {
  const renderComponent = renderComponentWithLabeling(LocalAuth);
  const onSubmitMock = jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(false);
      }),
  );
  const initialProps = {
    onSubmit: onSubmitMock,
    submitCopy: 'Log in',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent(initialProps);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find(Button).length).toBe(1);
<<<<<<< HEAD
      expect(wrapper.find(Input).length).toBe(1);
      expect(wrapper.find(PasswordInput).length).toBe(1);
      expect(wrapper.find(Button).props().children).toBe('Log in');
=======
      expect(wrapper.find(EmailInput).length).toBe(1);
      expect(wrapper.find(PasswordInput).length).toBe(1);
      expect(wrapper.find(Button).props().children).toBe('Log in');
      expect(wrapper.find(Consents).length).toBe(0);
    });
    it('should render consents while register', () => {
      const { wrapper } = renderComponent({
        onSubmit: onSubmitMock,
        submitCopy: 'Register',
      });
      expect(wrapper.find(Consents).length).toBe(1);
>>>>>>> release
    });
  });
  describe('@events', () => {
    describe('form submit', () => {
      const preventDefaultMock = jest.fn();
      it('should call onSubmit callback', done => {
        const { wrapper, instance } = renderComponent(initialProps);
        instance.setState({
          email: 'john@example.com',
          password: 'testtest',
        });
        expect(onSubmitMock).not.toHaveBeenCalled();
        wrapper
          .find('form')
          .simulate('submit', { preventDefault: preventDefaultMock });
        expect(preventDefaultMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'testtest',
        });
        setImmediate(() => {
          expect(instance.state.error).toBe('');
          done();
        });
      });
      it('should set error from onSubmit callback', done => {
        const onSubmitErrorMock = jest.fn().mockImplementation(
          () =>
            new Promise(resolve => {
              resolve({
                error: 'login error',
                message: 'login-error',
              });
            }),
        );
        const { wrapper, instance } = renderComponent({
          ...initialProps,
          onSubmit: onSubmitErrorMock,
        });
        instance.setState({
          email: 'john@example.com',
          password: 'testtest',
          error: '',
        });
        wrapper
          .find('form')
          .simulate('submit', { preventDefault: preventDefaultMock });
        setImmediate(() => {
          expect(onSubmitErrorMock).toHaveBeenCalledTimes(1);
          expect(instance.state.error).not.toBe('');
<<<<<<< HEAD
=======
          expect(instance.state.sendConsents).toBe(true);
>>>>>>> release
          done();
        });
      });
      describe('fields validation', () => {
        it('should set error and not call onSubmit cb when email empty', done => {
          const { wrapper, instance } = renderComponent(initialProps);
          instance.setState({
            email: '',
            password: 'testtest',
<<<<<<< HEAD
=======
            consents: [true],
>>>>>>> release
          });
          wrapper
            .find('form')
            .simulate('submit', { preventDefault: preventDefaultMock });
          expect(onSubmitMock).not.toHaveBeenCalled();
          expect(instance.state.errorsField.email).not.toBe('');
          done();
        });
        it('should set error and not call onSubmit cb when password empty', done => {
          const { wrapper, instance } = renderComponent(initialProps);
          instance.setState({
            email: 'john@example.com',
            password: '',
<<<<<<< HEAD
=======
            consents: [true],
>>>>>>> release
          });
          wrapper
            .find('form')
            .simulate('submit', { preventDefault: preventDefaultMock });
          expect(onSubmitMock).not.toHaveBeenCalled();
          expect(instance.state.errorsField.password).not.toBe('');
          done();
        });
<<<<<<< HEAD
=======
        it('should set error and not call onSubmit cb while required consents not checked', done => {
          const { wrapper, instance } = renderComponent(initialProps);
          instance.setState({
            email: 'john@example.com',
            password: '',
            consents: [false],
            consentDefinitions: mockConsent,
          });
          wrapper
            .find('form')
            .simulate('submit', { preventDefault: preventDefaultMock });
          expect(onSubmitMock).not.toHaveBeenCalled();
          expect(instance.state.errorsField.consents).not.toBe('');
          done();
        });
>>>>>>> release
        it('should set error and not call onSubmit cb when email not formatted correctly', done => {
          const { wrapper, instance } = renderComponent(initialProps);
          instance.setState({
            email: 'john',
            password: 'testtest',
<<<<<<< HEAD
=======
            consents: [true],
>>>>>>> release
          });
          wrapper
            .find('form')
            .simulate('submit', { preventDefault: preventDefaultMock });
          expect(onSubmitMock).not.toHaveBeenCalled();
          expect(instance.state.errorsField.email).not.toBe('');
          done();
        });
        it('should set error and not call onSubmit cb when password not valid and isPassValideted on', done => {
          const { wrapper, instance } = renderComponent({
            ...initialProps,
            isPassValideted: true,
          });
          instance.setState({
            email: 'john@example.com',
            password: 'testtest',
<<<<<<< HEAD
=======
            consents: [true],
>>>>>>> release
          });
          wrapper
            .find('form')
            .simulate('submit', { preventDefault: preventDefaultMock });
          expect(onSubmitMock).not.toHaveBeenCalled();
          expect(instance.state.errorsField.password).not.toBe('');
          done();
        });
        it('should set error and not call onSubmit cb when password not valid and isPassValideted on', done => {
          const { wrapper, instance } = renderComponent({
            ...initialProps,
            isPassValideted: true,
          });
          instance.setState({
            email: 'john@example.com',
            password: 'testtest',
<<<<<<< HEAD
=======
            consents: [true],
>>>>>>> release
          });
          wrapper
            .find('form')
            .simulate('submit', { preventDefault: preventDefaultMock });
          expect(onSubmitMock).not.toHaveBeenCalled();
          expect(instance.state.errorsField.password).not.toBe('');
          done();
        });
      });
    });
    describe('email input blur', () => {
      it('should set field error if email empty', () => {
        const { instance } = renderComponent(initialProps);
        instance.setState({
          email: '',
        });
        instance.onEmailBlur();
        expect(instance.state.errorsField.email).not.toBe('');
        expect(instance.state.errorsField.email).toBe(
          'Please fill out this field.',
        );
      });
      it('should set field error if email not valid', () => {
        const { instance } = renderComponent(initialProps);
        instance.setState({
          email: 'john',
        });
        instance.onEmailBlur();
        expect(instance.state.errorsField.email).not.toBe('');
        expect(instance.state.errorsField.email).toBe(
          'The email address is not properly formatted.',
        );
      });
    });
    describe('inputs change', () => {
      it('should set email in state when email input changed', () => {
        const { instance, wrapper } = renderComponent(initialProps);
        expect(instance.state.email).toBe('');
        wrapper
<<<<<<< HEAD
          .find(Input)
          .props()
          .onChangeFn({ target: { value: 'joh', name: 'email' } });
=======
          .find(EmailInput)
          .props()
          .onChangeFn('joh');
>>>>>>> release
        expect(instance.state.email).toBe('joh');
      });
      it('should set password in state when passwordq input changed', () => {
        const { instance, wrapper } = renderComponent(initialProps);
        expect(instance.state.password).toBe('');
        wrapper
          .find(PasswordInput)
          .props()
          .onChangeFn('test');
        expect(instance.state.password).toBe('test');
      });
<<<<<<< HEAD
=======
      it('should call onEmailChange when email input changed', () => {
        const onEmailChangeMock = jest.fn();
        const { wrapper } = renderComponent({
          ...initialProps,
          onEmailChange: onEmailChangeMock,
        });
        expect(onEmailChangeMock).not.toHaveBeenCalled();
        wrapper
          .find(EmailInput)
          .props()
          .onChangeFn('joh');
        expect(onEmailChangeMock).toHaveBeenCalledTimes(1);
        expect(onEmailChangeMock).toHaveBeenCalledWith('joh');
      });
      it('should call onConsentsChange and update consents definitions', () => {
        const consents = [false];
        const consentDefinitions = mockConsent;
        const { wrapper } = renderComponent({
          onSubmit: onSubmitMock,
          submitCopy: 'Register',
        });
        expect(wrapper.state().consents).toEqual([]);
        expect(wrapper.state().consentDefinitions).toEqual([]);
        wrapper
          .find(Consents)
          .props()
          .onChangeFn([false], mockConsent);
        expect(wrapper.state().consents).toEqual(consents);
        expect(wrapper.state().consentDefinitions).toEqual(consentDefinitions);
      });
>>>>>>> release
    });
  });
});
