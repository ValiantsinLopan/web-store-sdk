import testComponentHelper from 'test/helpers/testComponentHelper.js';
import Input from 'src/components/common/Input';
import EmailInput from '../EmailInput';

describe('<EmailInput/>', () => {
  const renderComponent = testComponentHelper(EmailInput);

  describe('@renders', () => {
    it('should render Input component', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.find(Input).length).toBe(1);
    });
    it('should render Input with props passed', () => {
      const className = 'someClass';
      const error = 'an error occured';
      const value = 'john@exam';
      const onChangeFn = jest.fn();
      const onBlurFn = jest.fn();
      const { wrapper } = renderComponent({
        className,
        error,
        value,
        onChangeFn,
        onBlurFn,
      });
      expect(wrapper.find(Input).props().className).toBe(className);
      expect(wrapper.find(Input).props().error).toBe(error);
      expect(wrapper.find(Input).props().value).toBe(value);
      expect(wrapper.find(Input).props().onChangeFn).toBe(onChangeFn);
      expect(wrapper.find(Input).props().onBlurFn).toBe(onBlurFn);
      expect(wrapper.find(Input).props().name).toBe('email');
      expect(wrapper.find(Input).props().icon).toBe('email');
    });
  });
});
