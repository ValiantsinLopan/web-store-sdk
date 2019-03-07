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
    it('should add variant class name if variant passed', () => {
      const { wrapper } = renderComponent({ variant: 'secondary' });
      expect(wrapper.hasClass('button-variant-secondary')).toBe(true);
    });
    it('should add text-align class while button is in fb or google variant', () => {
      const { wrapper } = renderComponent({
        children: 'some text',
        variant: 'fb',
      });
      expect(wrapper.hasClass('text-align')).toBe(true);
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
