import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import PasswordInput from '../PasswordInput';

describe('<PasswordInput/>', () => {
  const renderComponent = renderComponentWithLabeling(PasswordInput);
  const initialState = {
    value: '',
  };

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent(initialState);
      const inputComponent = wrapper.find('Input');
      expect(inputComponent.length).toBe(1);
      expect(inputComponent.props().inputType).toBe('password');
      expect(inputComponent.props().name).toBe('password');
      expect(inputComponent.props().autocomplete).toBe('off');
      expect(inputComponent.props().icon).toBe('pass');
      expect(wrapper.state().passError).toBe('');
      expect(wrapper.state().errorLabel).toBe('');
    });
  });
  describe('@events', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('should call passed function on change', () => {
      const onChangeMock = jest.fn();
      const { wrapper } = renderComponent({
        ...initialState,
        onChangeFn: onChangeMock,
      });
      expect(onChangeMock).not.toHaveBeenCalled();
      wrapper
        .find('Input')
        .props()
        .onChangeFn({ target: { value: 'sth' } });
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
    it('should set too short error if less than 6 chars', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        isPassValideted: true,
      });
      wrapper
        .find('Input')
        .props()
        .onChangeFn({ target: { value: 'sth' } });
      expect(wrapper.state().passError).toBe('Too short');
      expect(wrapper.state().errorLabel).toBe('too-short');
    });
    it('should set weak indicator if only small letters', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        isPassValideted: true,
      });
      wrapper
        .find('Input')
        .props()
        .onChangeFn({ target: { value: 'something' } });
      expect(wrapper.state().passError).toBe('Weak');
      expect(wrapper.state().errorLabel).toBe('weak');
    });
    it('should set weak indicator if small and big letters', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        isPassValideted: true,
      });
      wrapper
        .find('Input')
        .props()
        .onChangeFn({ target: { value: 'somethingELSE' } });
      expect(wrapper.state().passError).toBe('Weak');
      expect(wrapper.state().errorLabel).toBe('weak');
    });
    it('should set good indicator if small and big letters and numbers', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        isPassValideted: true,
      });
      wrapper
        .find('Input')
        .props()
        .onChangeFn({ target: { value: 'somethingELSE123' } });
      expect(wrapper.state().passError).toBe('Good');
      expect(wrapper.state().errorLabel).toBe('good');
    });
    it('should set strong indicator if small and big letters and numbers', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        isPassValideted: true,
      });
      wrapper
        .find('Input')
        .props()
        .onChangeFn({ target: { value: 'somethingELSE123$%^' } });
      expect(wrapper.state().passError).toBe('Strong');
      expect(wrapper.state().errorLabel).toBe('strong');
    });
    it('should set fair indicator if small letters and numbers', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        isPassValideted: true,
      });
      wrapper
        .find('Input')
        .props()
        .onChangeFn({ target: { value: 'something123' } });
      expect(wrapper.state().passError).toBe('Fair');
      expect(wrapper.state().errorLabel).toBe('fair');
    });
  });
});
