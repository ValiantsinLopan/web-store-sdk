import Access from '../access';

jest.mock('src/config/config.client', () => ({
  offerId: '123456',
  paymentMethodId: 970532511,
}));

describe('Access service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      const p = new Promise(resolve => {
        resolve({
          json() {
            return {
              data: {
                success: true,
              },
            };
          },
        });
      });

      return p;
    });
  });

  describe('registerSubscription', () => {
    it('should call register subscription', async () => {
      const email = 'john.doe@example.com';
      const expiresAt = null;
      const response = await Access.registerSubscription({ email, expiresAt });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/access/registerSubscription',
        {
          body:
            '{"email":"john.doe@example.com","offerId":"123456","expiresAt":null}',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );
      expect(response).toEqual({ success: true });
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

      try {
        await Access.registerSubscription({
          email: 'john.doe@example.com',
          expiresAt: null,
        });
      } catch (e) {
        expect(e).toEqual(errorObj);
      }
    });
  });
  describe('createOrderFromOffer', () => {
    const customerId = 111111111;
    const currency = 'USD';
    const country = 'US';
    it('should call createOrderFromOffer method', async () => {
      const response = await Access.createOrderFromOffer({
        customerId,
        currency,
        country,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/access/createOrderFromOffer',
        {
          body:
            '{"paymentMethodId":970532511,"customerId":111111111,"offerId":"123456","currency":"USD","country":"US"}',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );
      expect(response).toEqual({ success: true });
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

      try {
        await Access.createOrderFromOffer({
          customerId,
          currency,
          country,
        });
      } catch (e) {
        expect(e).toEqual(errorObj);
      }
    });
  });
});
