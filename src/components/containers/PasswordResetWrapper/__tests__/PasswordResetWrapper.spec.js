import testComponentHelper from 'test/helpers/testComponentHelper.js';
import PasswordReset from 'src/components/common/PasswordReset/PasswordReset';
import PasswordResetWrapper from '../PasswordResetWrapper';

describe('<PasswordResetWrapper/>', () => {
  const renderComponent = testComponentHelper(
    PasswordResetWrapper.WrappedComponent,
  );

  describe('@renders', () => {
    it('should render PasswordReset component', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.find(PasswordReset).length).toBe(1);
    });
    it('should render PasswordReset component with email', () => {
      const email = 'john@example.com';
      const { wrapper } = renderComponent({
        tempEmail: email,
      });
      expect(wrapper.find(PasswordReset).props().email).toBe(email);
    });
  });
});
