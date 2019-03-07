import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import { getOffer } from 'src/services/offer';
import CouponInput from 'src/components/common/CouponInput/CouponInput';
import OfferDetails from '../OfferDetails';

const mockNewPrice = { newPrice: 123 };

jest.mock('src/config/config.client', () => ({
  offerId: 'S123',
}));
jest.mock('src/services/offer', () => ({
  getOffer: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ offerTitle: 'Sample offer' });
      }),
  ),
  checkIfHasTrial: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ trialAvailable: true });
      }),
  ),
  getPrice: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(mockNewPrice);
      }),
  ),
}));

describe('<OfferDetails/>', () => {
  const renderComponent = renderComponentWithLabeling(
    OfferDetails.WrappedComponent,
  );

  describe('@renders', () => {
    it('should render initial state - loader', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.exists('Loader')).toBe(true);
    });
    it('should render initial state - when loaded', () => {
      const { wrapper } = renderComponent();
      wrapper.setState({ loading: false });
      expect(wrapper.hasClass('offerWrapper')).toBe(true);
    });
    it('should render offer data', () => {
      const offerTitle = 'Sample offer';
      const priceExclTax = 15;
      const customerCurrencySymbol = '$';
      const { wrapper } = renderComponent({
        offerTitle,
        priceExclTax,
        customerCurrencySymbol,
      });
      wrapper.setState({ loading: false });
      expect(wrapper.find('.offerTitle').text()).toBe(offerTitle);
      expect(
        wrapper
          .find('.offerPrice')
          .first()
          .text(),
      ).toContain(priceExclTax);
      expect(
        wrapper
          .find('.offerPrice')
          .first()
          .text(),
      ).toContain(customerCurrencySymbol);
    });
    it('should render trial batch if trial available', () => {
      const { wrapper } = renderComponent();
      wrapper.setState({ hasTrial: true, loading: false });
      expect(wrapper.find('.trial').length).toBe(1);
    });
    it('should render coupon input', () => {
      const email = 'john@example.com';
      const { wrapper } = renderComponent({ email });
      wrapper.setState({ loading: false });
      expect(wrapper.find(CouponInput).length).toBe(1);
      expect(wrapper.find(CouponInput).props().email).toBe(email);
    });
    it('should render price before discount and coupon value when coupon applied', () => {
      const { wrapper } = renderComponent({
        priceExclTax: 20,
        priceExclTaxBeforeDiscount: 25,
        customerCurrencySymbol: '$',
      });
      wrapper.setState({ loading: false, couponApplied: true });
      expect(wrapper.find('.priceBeforeWrapper').length).toBe(1);
      expect(
        wrapper
          .find('.priceBeforeWrapper')
          .find('.offerPrice')
          .text(),
      ).toBe('$25 (exVAT)');
      expect(wrapper.find('.couponDiscountWrapper').length).toBe(1);
      expect(
        wrapper
          .find('.couponDiscountWrapper')
          .find('.offerPrice')
          .text(),
      ).toBe('$5');
    });
  });
  describe('@lifecycle', () => {
    describe('componentDidMount', () => {
      it('should check if user has trial', done => {
        const setTrialMock = jest.fn();
        const { wrapper } = renderComponent({
          setTrial: setTrialMock,
        });
        setImmediate(() => {
          expect(wrapper.state().hasTrial).toBe(true);
          expect(setTrialMock).toHaveBeenCalledTimes(1);
          done();
        });
      });
      it('should set offer details', done => {
        const setOfferDetailsMock = jest.fn();
        const { wrapper } = renderComponent({
          setOfferDetails: setOfferDetailsMock,
        });
        setImmediate(() => {
          expect(wrapper.state().loading).toBe(false);
          expect(setOfferDetailsMock).toHaveBeenCalledTimes(1);
          expect(setOfferDetailsMock).toHaveBeenCalledWith({
            offerTitle: 'Sample offer',
          });
          done();
        });
      });
      it('should set error', done => {
        const setOfferDetailsMock = jest.fn();
        const errorMock = { code: 2, message: 'errorMessage' };
        getOffer.mockImplementationOnce(
          () =>
            new Promise((resolve, reject) => {
              reject(errorMock);
            }),
        );
        const { wrapper } = renderComponent({
          setOfferDetails: setOfferDetailsMock,
        });
        setImmediate(() => {
          expect(wrapper.state().loading).toBe(false);
          expect(wrapper.state().error).toBe(true);
          expect(setOfferDetailsMock).not.toHaveBeenCalled();
          done();
        });
      });
    });
    describe('componentWillUnmount', () => {
      it('should abort all async calls', () => {
        const { instance } = renderComponent({});
        instance.abortController = {
          abort: jest.fn(),
        };
        instance.componentWillUnmount();
        expect(instance.abortController.abort).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('@events', () => {
    describe('on coupon applied', () => {
      it('should set new price', done => {
        const setPriceMock = jest.fn();
        const { wrapper } = renderComponent({
          setPrice: setPriceMock,
        });
        wrapper.setState({ loading: false });
        wrapper
          .find(CouponInput)
          .props()
          .onCouponApplied();
        setImmediate(() => {
          expect(setPriceMock).toHaveBeenCalledTimes(1);
          expect(setPriceMock).toHaveBeenCalledWith(mockNewPrice);
          expect(wrapper.state().couponApplied).toBe(true);
          done();
        });
      });
    });
  });
});
