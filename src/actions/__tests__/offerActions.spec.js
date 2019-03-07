import { SET_OFFER, SET_PRICE, SET_TRIAL } from 'src/constants';
import * as actions from '../offerActions';

describe('Offer Actions', () => {
  it('setOfferDetails(data)', () => {
    const offerData = {
      offerTitle: 'Sample offer',
    };
    expect(actions.setOfferDetails(offerData)).toEqual({
      type: SET_OFFER,
      payload: offerData,
    });
  });
  it('setPrice(data)', () => {
    const offerData = {
      discountedCustomerPriceExclTax: '11.29',
    };
    expect(actions.setPrice(offerData)).toEqual({
      type: SET_PRICE,
      payload: offerData,
    });
  });
  it('setTrial()', () => {
    expect(actions.setTrial()).toEqual({
      type: SET_TRIAL,
    });
  });
});
