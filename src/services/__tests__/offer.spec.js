import Offer from '../offer';

describe('Offer service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('getOffer', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() => {
        const p = new Promise(resolve => {
          resolve({
            json() {
              return {
                customerCountry: 'US',
                offerTitle: 'Simple offer',
              };
            },
          });
        });

        return p;
      });
    });

    it('should fetch offer data', async () => {
      const abortController = { signal: { abort: jest.fn() } };
      const response = await Offer.getOffer('PL123', abortController);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/offer/PL123',
        abortController,
      );
      expect(response).toEqual({
        customerCountry: 'US',
        offerTitle: 'Simple offer',
      });
    });
  });
  describe('checkIfHasTrial', () => {
    it('should make a call', async () => {
      global.fetch = jest.fn().mockImplementation(() => {
        const p = new Promise(resolve => {
          resolve({
            json() {
              return {
                data: {
                  trailAvailable: false,
                },
              };
            },
          });
        });

        return p;
      });
      const email = 'john@example.com';
      const response = await Offer.checkIfHasTrial('PL123', email);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/offer/PL123/hasTrial?email=john%40example.com',
      );
      expect(response).toEqual({
        trailAvailable: false,
      });
    });
    it('should throw an error if error message found', async () => {
      const errorObj = {
        error: 'some error',
        message: 'error message',
      };
      global.fetch = jest.fn().mockImplementationOnce(() => {
        const p = new Promise(resolve => {
          resolve({
            json() {
              return errorObj;
            },
          });
        });

        return p;
      });
      const email = 'john@example.com';
      try {
        await Offer.checkIfHasTrial('PL123', email);
      } catch (e) {
        expect(e).toEqual(errorObj);
      }
    });
  });
});
