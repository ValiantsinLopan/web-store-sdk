import { renderComponentWithLabeling } from 'test/helpers/testComponentHelper.js';
import { reserveCoupon } from 'src/services/offer';
import Input from 'src/components/common/Input';
import CouponInput from '../CouponInput';

jest.mock('src/config/config.client', () => ({
  offerId: 'S123',
}));
jest.mock('src/services/offer', () => ({
  reserveCoupon: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ success: true });
      }),
  ),
  getCampaignInfo: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ discount: 0.3 });
      }),
  ),
}));

describe('<CouponInput/>', () => {
  const renderComponent = renderComponentWithLabeling(CouponInput);

  describe('@renders', () => {
    it('should render Input component', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.find(Input).length).toBe(1);
      expect(wrapper.find(Input).props().name).toBe('coupon');
      expect(wrapper.find(Input).props().autocomplete).toBe('off');
      expect(wrapper.find(Input).props().placeholder).toBe('Redeem coupon');
      expect(wrapper.find(Input).props().icon).toBe('coupon');
      expect(wrapper.find(Input).props().indicator).toBe('');
    });
    it('should pass indicator - fail when coupon failed', () => {
      const { wrapper } = renderComponent();
      wrapper.setState({
        message: 'Failed',
        couponApplied: false,
        msgShow: true,
      });
      expect(wrapper.find(Input).props().indicator).toBe('fail');
    });
    it('should pass indicator - correct when coupon applied', () => {
      const { wrapper } = renderComponent();
      wrapper.setState({
        message: 'Coupon applied!',
        couponApplied: true,
        msgShow: true,
      });
      expect(wrapper.find(Input).props().indicator).toBe('correct');
    });
  });
  describe('@events', () => {
    it('should hide message when input focus', () => {
      const { wrapper } = renderComponent();
      wrapper.setState({
        msgShow: true,
      });
      wrapper
        .find(Input)
        .props()
        .onFocusFn();
      expect(wrapper.state().msgShow).toBe(false);
    });
    describe('on coupon applied', () => {
      const couponMock = 'w2r4T5';
      it('should reserve coupon and show info when correct coupon ', done => {
        const emailMock = 'john@example.com';
        const onCouponAppliedMock = jest.fn();
        const t = jest
          .fn()
          .mockImplementation(
            (text, options) => (!options ? text : { text, options }),
          );
        const { wrapper } = renderComponent({
          email: emailMock,
          onCouponApplied: onCouponAppliedMock,
          t,
        });
        expect(onCouponAppliedMock).not.toHaveBeenCalled();
        wrapper
          .find(Input)
          .props()
          .onEnterFn(couponMock);
        setImmediate(() => {
          expect(onCouponAppliedMock).toHaveBeenCalledTimes(1);
          expect(onCouponAppliedMock).toHaveBeenCalledWith(couponMock);
          expect(wrapper.state().message.options.discount).toBe(30);
          expect(wrapper.state().message.text).toBe(
            'Your coupon has been applied! Enjoy your {{discount}}% discount.',
          );
          expect(wrapper.state().couponApplied).toBe(true);
          expect(wrapper.state().msgShow).toBe(true);
          done();
        });
      });
      it('should show message when incorrect coupon', done => {
        const emailMock = 'john@example.com';
        reserveCoupon.mockImplementationOnce(
          () =>
            new Promise((resolve, reject) => {
              reject(new Error('error'));
            }),
        );
        const { wrapper } = renderComponent({
          email: emailMock,
        });
        wrapper
          .find(Input)
          .props()
          .onEnterFn(couponMock);
        expect(reserveCoupon).toHaveBeenCalled();
        setImmediate(() => {
          expect(wrapper.state().message).toBe(
            'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
          );
          expect(wrapper.state().couponApplied).toBe(false);
          expect(wrapper.state().msgShow).toBe(true);
          done();
        });
      });
      it('should hide message after 5 seconds', done => {
        jest.useFakeTimers();
        const emailMock = 'john@example.com';
        const onCouponAppliedMock = jest.fn();
        const { wrapper } = renderComponent({
          email: emailMock,
          onCouponApplied: onCouponAppliedMock,
        });
        wrapper
          .find(Input)
          .props()
          .onEnterFn(couponMock);
        setImmediate(() => {
          expect(wrapper.state().msgShow).toBe(true);
          jest.runAllTimers();
          expect(wrapper.state().msgShow).toBe(false);
          done();
        });
      });
    });
  });
  describe('@lifecycle', () => {
    describe('constuctor', () => {
      it('should set initial state values', () => {
        const { wrapper } = renderComponent();
        expect(wrapper.state().message).toBe('');
        expect(wrapper.state().couponApplied).toBe(false);
        expect(wrapper.state().msgShow).toBe(false);
      });
    });
  });
});
