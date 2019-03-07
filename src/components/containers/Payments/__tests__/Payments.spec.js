import testComponentHelper from 'test/helpers/testComponentHelper.js';
import {
  registerSubscription,
  createOrderFromOffer,
} from 'src/services/access';
import Payments from '../Payments';

jest.mock('src/services/access', () => ({
  registerSubscription: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ success: true });
      }),
  ),
  createOrderFromOffer: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({
          success: true,
          order: { id: 1111111 },
        });
      }),
  ),
}));

describe('<Payments/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderComponent = testComponentHelper(Payments.WrappedComponent);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.exists('Button')).toBe(true);
    });
  });
  describe('@events', () => {
    describe('button click', () => {
      it('should purchase subscription and call action when success', done => {
        const subscriptionRegisteredMock = jest.fn();
        const { wrapper } = renderComponent({
          subscriptionRegistered: subscriptionRegisteredMock,
          email: 'john@example.com',
          expiresAt: null,
          customerId: '123123',
          currency: 'USD',
          country: 'en_us',
        });
        expect(subscriptionRegisteredMock).not.toHaveBeenCalled();
        expect(createOrderFromOffer).not.toHaveBeenCalled();
        wrapper
          .find('Button.confirmButton')
          .props()
          .onClickFn();
        setImmediate(() => {
          expect(createOrderFromOffer).toHaveBeenCalledTimes(1);
          expect(createOrderFromOffer).toHaveBeenCalledWith({
            customerId: '123123',
            currency: 'USD',
            country: 'en_us',
          });
          expect(registerSubscription).toHaveBeenCalledTimes(1);
          expect(registerSubscription).toHaveBeenCalledWith({
            email: 'john@example.com',
            expiresAt: null,
          });
          expect(subscriptionRegisteredMock).toHaveBeenCalledTimes(1);
          done();
        });
      });
      it('should try purchase subscription and not call action when failure', done => {
        const subscriptionRegisteredMock = jest.fn();
        const { wrapper } = renderComponent({
          subscriptionRegistered: subscriptionRegisteredMock,
          email: 'john@example.com',
          expiresAt: null,
          customerId: '123123',
          currency: 'USD',
          country: 'en_us',
        });
        registerSubscription.mockImplementationOnce(
          () =>
            new Promise(resolve => {
              resolve({ success: false });
            }),
        );
        expect(subscriptionRegisteredMock).not.toHaveBeenCalled();
        expect(createOrderFromOffer).not.toHaveBeenCalled();
        wrapper
          .find('Button.confirmButton')
          .props()
          .onClickFn();
        setImmediate(() => {
          expect(createOrderFromOffer).toHaveBeenCalled();
          expect(createOrderFromOffer).toHaveBeenCalledWith({
            customerId: '123123',
            currency: 'USD',
            country: 'en_us',
          });
          expect(subscriptionRegisteredMock).not.toHaveBeenCalled();
          expect(registerSubscription).toHaveBeenCalledTimes(1);
          expect(registerSubscription).toHaveBeenCalledWith({
            email: 'john@example.com',
            expiresAt: null,
          });
          done();
        });
      });
    });
    describe('on payment method toggle', () => {
      it('should show payment methods if hidden before', () => {
        const { wrapper } = renderComponent();
        expect(wrapper.state().paymentShown).toBe(false);
        wrapper
          .find('Button.creditCardButton')
          .props()
          .onClickFn();
        expect(wrapper.state().paymentShown).toBe(true);
      });
    });
  });
});
