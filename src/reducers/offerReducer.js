import { SET_OFFER, SET_PRICE, SET_TRIAL } from 'src/constants';
import createReducer from 'src/lib/createReducer';

export default createReducer(
  { hasTrial: false },
  {
    [SET_OFFER]: (state, { payload }) => ({
      ...state,
      offerCountry: payload.offerCountry,
      offerCurrency: payload.offerCurrency,
      offerCurrencySymbol: payload.offerCurrencySymbol,
      offerPrice: payload.offerPrice,
      offerTitle: payload.offerTitle,
      period: payload.period,
      customerCurrencySymbol: payload.customerCurrencySymbol,
      priceExclTax: payload.customerPriceExclTax,
      priceInclTax: payload.customerPriceInclTax,
      expiresAt: payload.expiresAt,
      freePeriods: payload.freePeriods,
    }),
    [SET_PRICE]: (state, { payload }) => ({
      ...state,
      priceExclTaxBeforeDiscount: state.priceExclTax,
      priceInclTaxBeforeDiscount: state.priceInclTax,
      priceExclTax: payload.discountedCustomerPriceExclTax,
      priceInclTax: payload.discountedCustomerPriceInclTax,
    }),
    [SET_TRIAL]: state => ({
      ...state,
      hasTrial: true,
    }),
  },
);
