import { SET_OFFER, SET_PRICE, SET_TRIAL } from 'src/constants';
import testReducer from '../offerReducer';

describe('Offer Reducer', () => {
  const initialState = {};

  describe('SET_OFFER', () => {
    it('should offer details', () => {
      const data = {
        offerCountry: 'US',
        offerCurrency: 'USD',
        offerCurrencySymbol: '$',
        offerPrice: 14,
        offerTitle: 'Sample title',
        period: 24,
        customerCurrencySymbol: '$',
        expiresAt: null,
        freePeriods: 2,
      };
      const customerPrice = {
        customerPriceExclTax: 14,
        customerPriceInclTax: 14,
      };
      expect(
        testReducer(initialState, {
          type: SET_OFFER,
          payload: {
            ...data,
            ...customerPrice,
          },
        }),
      ).toEqual({
        ...initialState,
        ...data,
        priceExclTax: 14,
        priceInclTax: 14,
      });
    });
  });
  describe('SET_PRICE', () => {
    it('should set price from discounted values', () => {
      const priceWithoutTax = 11.29;
      const priceWithTax = 18.33;
      expect(
        testReducer(
          {
            priceExclTax: 20,
            priceInclTax: 25,
          },
          {
            type: SET_PRICE,
            payload: {
              discountedCustomerPriceExclTax: priceWithoutTax,
              discountedCustomerPriceInclTax: priceWithTax,
            },
          },
        ),
      ).toEqual({
        ...initialState,
        priceExclTax: priceWithoutTax,
        priceInclTax: priceWithTax,
        priceExclTaxBeforeDiscount: 20,
        priceInclTaxBeforeDiscount: 25,
      });
    });
  });
  describe('SET_TRIAL', () => {
    it('should set trial flag to true', () => {
      expect(
        testReducer(initialState, {
          type: SET_TRIAL,
        }),
      ).toEqual({
        ...initialState,
        hasTrial: true,
      });
    });
  });
});
