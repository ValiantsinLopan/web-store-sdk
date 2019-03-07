import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Input from '../Input';

describe('<Input/>', () => {
  const renderComponent = testComponentHelper(Input);
  const initialState = {
    name: 'input name',
  };

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper, instance } = renderComponent(initialState);
      const input = wrapper.find('input');
      expect(input.props().name).toBe('input name');
      expect(input.props().className).toBe('input');
      expect(input.props().type).toBe('text');
      expect(input.props().autoComplete).toBe('on');
      expect(input.props().placeholder).toBe('');
      expect(typeof input.props().onChange).toBe('function');
      expect(instance.props.icon).toBe('');
      expect(instance.props.error).toBe('');
      expect(instance.props.value).toBe('');
      expect(wrapper.find('input').hasClass('error')).toBe(false);
    });
    it('should add custom class name', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        className: 'customClassName',
      });
      expect(wrapper.find('input').props().className).toBe(
        'input customClassName',
      );
      expect(wrapper.find('.errorField').hasClass('customClassName')).toBe(
        true,
      );
    });
    it('should set custom type if passed', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        inputType: 'someType',
      });
      expect(wrapper.find('input').props().type).toBe('someType');
    });
    it('should set custom autocomplete value', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        autocomplete: 'off',
      });
      expect(wrapper.find('input').props().autoComplete).toBe('off');
    });
    it('should set icon value', () => {
      const iconName = 'email';
      const { wrapper } = renderComponent({ ...initialState, icon: iconName });
      expect(wrapper.hasClass(iconName)).toBe(true);
    });
    it('should add class to input when general error', () => {
      const { wrapper } = renderComponent({
        ...initialState,
        error: 'general',
      });
      expect(wrapper.find('input').hasClass('error')).toBe(true);
    });
    it('should add class to input and show message when error', () => {
      const errorMessage = 'Invalid field';
      const { wrapper } = renderComponent({
        ...initialState,
        error: errorMessage,
      });
      expect(wrapper.find('input').hasClass('error')).toBe(true);
      expect(wrapper.find('.errorField').text()).toBe(errorMessage);
    });
  });
  describe('@events', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    describe('on change', () => {
      it('should call passed function set state', () => {
        const onChangeMock = jest.fn();
        const { wrapper } = renderComponent({
          ...initialState,
          onChangeFn: onChangeMock,
        });
        expect(onChangeMock).not.toHaveBeenCalled();
        expect(wrapper.state().value).toBe('');
        wrapper.find('input').simulate('change', { target: { value: 'sth' } });
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(wrapper.state().value).toBe('sth');
      });
    });
    describe('on key down', () => {
      it('should call onEnterFn when enter key pressed', () => {
        const onEnterMock = jest.fn();
        const couponCode = 'abc';
        const { wrapper } = renderComponent({
          ...initialState,
          onEnterFn: onEnterMock,
        });
        wrapper.setState({
          value: couponCode,
        });
        expect(onEnterMock).not.toHaveBeenCalled();
        wrapper.find('input').simulate('keyDown', { keyCode: 13 });
        expect(onEnterMock).toHaveBeenCalledTimes(1);
        expect(onEnterMock).toHaveBeenCalledWith(couponCode);
      });
      it('should not call onEnterFn when not enter key pressed', () => {
        const onEnterMock = jest.fn();
        const { wrapper } = renderComponent({
          ...initialState,
          onEnterFn: onEnterMock,
        });
        expect(onEnterMock).not.toHaveBeenCalled();
        wrapper.find('input').simulate('keyDown', { keyCode: 20 });
        expect(onEnterMock).not.toHaveBeenCalled();
      });
    });
  });
});
