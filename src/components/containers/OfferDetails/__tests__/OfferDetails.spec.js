import testComponentHelper from 'test/helpers/testComponentHelper.js';
import OfferDetails from '../OfferDetails';

describe('<OfferDetails/>', () => {
  const renderComponent = testComponentHelper(OfferDetails.WrappedComponent);

  describe('@renders', () => {
    it('should render initial state', () => {
      const name = 'john@example.com';
      const { wrapper } = renderComponent({ username: name });
      expect(wrapper.html()).toContain(name);
    });
  });
});
