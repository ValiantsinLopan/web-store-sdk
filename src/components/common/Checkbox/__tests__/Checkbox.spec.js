import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Checkbox from '../Checkbox';

describe('<Checkbox/>', () => {
  const renderComponent = testComponentHelper(Checkbox);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.hasClass('checkbox')).toBe(true);
      expect(wrapper.prop('checked')).toEqual(false);
    });
    it('should add custom className if passed', () => {
      const className = 'customClassName';
      const { wrapper } = renderComponent({ className });
      expect(wrapper.hasClass('checkbox')).toBe(true);
      expect(wrapper.hasClass(className)).toBe(true);
    });
    it('should add class to checkbox when general error', () => {
      const { wrapper } = renderComponent({
        error: 'general',
        required: true,
      });
      expect(wrapper.find('.checkFrame').hasClass('error')).toBe(true);
    });
    it('should change checked field if passed', () => {
      const checkedProps = true;
      const { wrapper } = renderComponent({ checked: checkedProps });
      expect(wrapper.prop('checked')).toBe(checkedProps);
    });
  });
  describe('@events', () => {
    it('should call onClickFn when checkbox is clicked', () => {
      const clickFn = jest.fn();
      const { wrapper } = renderComponent({ onClickFn: clickFn });
      expect(clickFn).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
});
