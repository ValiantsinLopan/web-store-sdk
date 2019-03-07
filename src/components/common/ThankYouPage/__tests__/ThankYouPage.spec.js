import testComponentHelper from 'test/helpers/testComponentHelper.js';
import ThankYouPage from '../ThankYouPage';

describe('<ThankYouPage/>', () => {
  const renderComponent = testComponentHelper(ThankYouPage);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.hasClass('thankYou')).toBe(true);
      expect(wrapper.find('Button').length).toBe(2);
      expect(wrapper.find('.thankYouSocials').length).toBe(1);
    });
  });
});
