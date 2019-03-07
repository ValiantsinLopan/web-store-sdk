import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Footer from '../Footer';

describe('<Footer/>', () => {
  const renderComponent = testComponentHelper(Footer);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.hasClass('footer')).toBe(true);
      expect(wrapper.find('.productBy').length).toBe(1);
      expect(wrapper.find('.security').length).toBe(1);
    });
    it('should add custom className', () => {
      const { wrapper } = renderComponent({ className: 'someClassName' });
      expect(wrapper.hasClass('someClassName')).toBe(true);
    });
  });
});
