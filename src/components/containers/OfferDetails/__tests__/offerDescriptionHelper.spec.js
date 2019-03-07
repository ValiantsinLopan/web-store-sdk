import * as helper from '../offerDescriptionHelper';

describe('offerDescriptionHelper', () => {
  describe('getOfferType', () => {
    it('should return `single`', () => {
      expect(helper.getOfferType('A1234')).toBe('single');
    });
    it('should return `rental`', () => {
      expect(helper.getOfferType('R1234')).toBe('rental');
    });
    it('should return `pass`', () => {
      expect(helper.getOfferType('P1234')).toBe('pass');
    });
    it('should return `subscription`', () => {
      expect(helper.getOfferType('S1234')).toBe('subscription');
    });
    it('should return `event`', () => {
      expect(helper.getOfferType('E1234')).toBe('event');
    });
    it('should return undefined if not valid type', () => {
      expect(helper.getOfferType('X1234')).toBe(undefined);
    });
  });
  describe('getOfferDescription', () => {
    const t = jest
      .fn()
      .mockImplementation(
        (text, options) => (!options ? text : { text, options }),
      );
    describe('for subscription', () => {
      it('should return key for week plan subscription', () => {
        expect(
          helper.getOfferDescription(t, 'subscription', {
            offerPeriod: 'week',
          }),
        ).toBe('Weekly plan. Renews automatically. Cancel anytime you want.');
      });
      it('should return key for month plan subscription', () => {
        expect(
          helper.getOfferDescription(t, 'subscription', {
            offerPeriod: 'month',
          }),
        ).toBe('Monthly plan. Renews automatically. Cancel anytime you want.');
      });
      it('should return key for 3months plan subscription', () => {
        expect(
          helper.getOfferDescription(t, 'subscription', {
            offerPeriod: '3months',
          }),
        ).toBe('3-month plan. Renews automatically. Cancel anytime you want.');
      });
      it('should return key for 6months plan subscription', () => {
        expect(
          helper.getOfferDescription(t, 'subscription', {
            offerPeriod: '6months',
          }),
        ).toBe('6-month plan. Renews automatically. Cancel anytime you want.');
      });
      it('should return key for year plan subscription', () => {
        expect(
          helper.getOfferDescription(t, 'subscription', {
            offerPeriod: 'year',
          }),
        ).toBe('Annual plan. Renews automatically. Cancel anytime you want.');
      });
    });
    describe('for pass', () => {
      it('should return key for day pass', () => {
        expect(
          helper.getOfferDescription(t, 'pass', {
            offerPeriod: 'day',
          }),
        ).toBe('Access for 24 hours');
      });
      it('should return key for week pass', () => {
        expect(
          helper.getOfferDescription(t, 'pass', {
            offerPeriod: 'week',
          }),
        ).toBe('Access for one week');
      });
      it('should return key for 2weeks pass', () => {
        expect(
          helper.getOfferDescription(t, 'pass', {
            offerPeriod: '2weeks',
          }),
        ).toBe('Access for two weeks');
      });
      it('should return key for 2weeks pass', () => {
        expect(
          helper.getOfferDescription(t, 'pass', {
            offerPeriod: 'month',
          }),
        ).toBe('Access for one month');
      });
      it('should return key for 3months pass', () => {
        expect(
          helper.getOfferDescription(t, 'pass', {
            offerPeriod: '3months',
          }),
        ).toBe('Access for 3 months');
      });
      it('should return key for 6months pass', () => {
        expect(
          helper.getOfferDescription(t, 'pass', {
            offerPeriod: '6months',
          }),
        ).toBe('Access for 6 months');
      });
      it('should return key for year pass', () => {
        expect(
          helper.getOfferDescription(t, 'pass', {
            offerPeriod: 'year',
          }),
        ).toBe('Access for one year');
      });
      it('should return key for custom pass', () => {
        const result = helper.getOfferDescription(t, 'pass', {
          offerPeriod: null,
          expiresAt: 1560722399,
        });
        expect(result.options.date).toBe(
          new Date(Date.UTC(2019, 5, 16, 21, 59, 59)).toLocaleString(),
        );
        expect(result.text).toBe('Access until {{date}}');
      });
    });
    describe('for rental', () => {
      it('should return key for less than 72h rental', () => {
        const result = helper.getOfferDescription(t, 'rental', {
          offerPeriod: 24,
        });
        expect(result.options.hours).toBe(24);
        expect(result.text).toBe('Video rental {{hours}}h');
      });
      it('should return key for more than 72h rental', () => {
        const result = helper.getOfferDescription(t, 'rental', {
          offerPeriod: 83,
        });
        expect(result.options.days).toBe(3);
        expect(result.text).toBe('Video rental {{days}} days');
      });
    });
  });
});
