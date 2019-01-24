import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Button from '../Button';

describe('<Button/>', () => {
  const renderComponent = testComponentHelper(Button);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.hasClass('button')).toBe(true);
      expect(wrapper.prop('type')).toBe('button');
    });
    it('should add custom className if passed', () => {
      const className = 'customClassName';
      const { wrapper } = renderComponent({ className });
      expect(wrapper.hasClass('button')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    it('should add color class name if color passed', () => {
      const { wrapper } = renderComponent({ color: 'white' });
      expect(wrapper.hasClass('button-variant-white')).toBe(true);
    });
    it('should change type if passed', () => {
      const newType = 'submit';
      const { wrapper } = renderComponent({ type: newType });
      expect(wrapper.prop('type')).toBe(newType);
    });
  });
  describe('@events', () => {
    it('should call onClickFn when button clicked', () => {
      const clickFn = jest.fn();
      const { wrapper } = renderComponent({ onClickFn: clickFn });
      expect(clickFn).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
});
