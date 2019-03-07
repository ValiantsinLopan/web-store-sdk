import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import SocialLogins from '../SocialLogins';

describe('<SocialLogins/>', () => {
  const renderComponent = renderComponentWithLabeling(SocialLogins);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.hasClass('sociallogins')).toBe(true);
      expect(wrapper.find('Button').length).toBe(2);
    });
  });
});
