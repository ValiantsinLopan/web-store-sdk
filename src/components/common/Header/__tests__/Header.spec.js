import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Header from '../Header';

describe('<Header/>', () => {
  const renderComponent = testComponentHelper(Header.WrappedComponent);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.hasClass('header')).toBe(true);
      expect(wrapper.find('img').length).toBe(1);
      expect(wrapper.find('img').prop('src')).toBe('test-file-stub');
      expect(wrapper.find('img').prop('alt')).toBe('logo');
    });
  });
});
