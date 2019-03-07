import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Loader from '../Loader';

describe('<Loader/>', () => {
  const renderComponent = testComponentHelper(Loader);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.hasClass('loader')).toBe(true);
    });
  });
});
