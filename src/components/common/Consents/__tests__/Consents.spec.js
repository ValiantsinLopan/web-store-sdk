import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import { submitConsent } from 'src/services/authentication';
import Checkbox from 'src/components/common/Checkbox';
import Consents from '../Consents';

const mockConsent = [
  {
    name: 'name',
    version: '1',
    label: 'consent <a href=""> Terms </a>',
    required: false,
  },
];

const mockConsentsToSubmit = {
  email: 'some@email.com',
  consent: mockConsent[0],
  isChecked: 'declined',
};

jest.mock('src/services/authentication', () => ({
  getConsents: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(mockConsent);
      }),
  ),
  submitConsent: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ success: true });
      }),
  ),
}));

describe('<Consents/>', () => {
  const renderComponent = renderComponentWithLabeling(Consents);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.exists('Loader')).toBe(true);
    });
    it('should render consents after fetching', () => {
      const { wrapper } = renderComponent();
      wrapper.setState({
        consentLoaded: true,
        consentDefinitions: mockConsent,
        checked: [false],
      });
      expect(wrapper.exists('Checkbox')).toBe(true);
      expect(wrapper.find(Checkbox).props().checked).toEqual(false);
      expect(wrapper.find(Checkbox).props().required).toEqual(
        mockConsent[0].required,
      );
      expect(wrapper.find(Checkbox).textContent).toEqual(mockConsent.label);
    });
    it('should render error', () => {
      const errorValue = 'error';
      const { wrapper } = renderComponent({
        error: errorValue,
      });
      expect(wrapper.exists('.errorConsents')).toBe(true);
      expect(wrapper.find('.errorConsents').text()).toEqual(errorValue);
    });
  });

  describe('@lifecycle', () => {
    describe('constructor', () => {
      it('should set default state values', () => {
        const { wrapper } = renderComponent();
        expect(wrapper.state().consentDefinitions).toEqual([]);
        expect(wrapper.state().consentsLabels).toEqual([]);
        expect(wrapper.state().checked).toEqual([]);
        expect(wrapper.state().consentLoaded).toBe(false);
      });
    });
    describe('componentDidMount', () => {
      it('should get consents definitions and init values', done => {
        const { wrapper } = renderComponent();
        setImmediate(() => {
          expect(wrapper.state().consentDefinitions).toEqual(mockConsent);
          expect(wrapper.state().consentLoaded).toBe(true);
          expect(wrapper.state().checked).toEqual([false]);
          expect(wrapper.state().consentsLabels).toEqual([
            'consent {{htmltag}} Terms {{endhtmltag}}',
          ]);
          done();
        });
      });
    });
    describe('componentDidUpdate', () => {
      it('submit consent', done => {
        const { wrapper } = renderComponent({
          email: mockConsentsToSubmit.email,
        });
        wrapper.setState({
          consentDefinitions: mockConsent,
          checked: [false],
        });
        wrapper.setProps({ sendConsents: true });
        setImmediate(() => {
          expect(submitConsent).toHaveBeenCalledWith(mockConsentsToSubmit);
          expect(submitConsent).toHaveBeenCalledTimes(1);
          done();
        });
      });
    });
  });
});
