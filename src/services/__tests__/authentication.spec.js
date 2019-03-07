import Authentication from '../authentication';

describe('Authentication service', () => {
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
                token: '1234',
              },
            };
          },
        });
      });

      return p;
    });
  });

  it('login should fetch auth data', async () => {
    const email = 'john.doe@example.com';
    const password = 'testtest';
    const response = await Authentication.login({ email, password });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/user/login', {
      body: '{"email":"john.doe@example.com","password":"testtest"}',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    expect(response).toEqual({ token: '1234' });
  });
<<<<<<< HEAD
=======

  describe('resetPassword', () => {
    it('should call reset password action', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => {
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
      const email = 'john.doe@example.com';
      const response = await Authentication.resetPassword({ email });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/user/resetPassword', {
        body: '{"email":"john.doe@example.com"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
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
        await Authentication.resetPassword({
          email: 'john.doe@example.com',
        });
      } catch (e) {
        expect(e).toEqual(errorObj);
      }
    });
  });

>>>>>>> release
  it('customerToken should get data for user', async () => {
    const customerToken = '123';
    const response = await Authentication.getUser({ customerToken });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/user', {
      body: '{"customerToken":"123"}',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    expect(response).toEqual({ token: '1234' });
  });
<<<<<<< HEAD
=======

>>>>>>> release
  describe('register', () => {
    it('should call for country and then register', async () => {
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() => {
          const p = new Promise(resolve => {
            resolve({
              json() {
                return {
                  data: {
                    country: 'pl',
                    currency: 'PLN',
                  },
                };
              },
            });
          });

          return p;
        })
        .mockImplementationOnce(() => {
          const p = new Promise(resolve => {
            resolve({
              json() {
                return {
                  data: {
                    sth: 'sth',
                  },
                };
              },
            });
          });

          return p;
        });
      /* eslint-disable no-restricted-properties, no-underscore-dangle */
      global.navigator.__defineGetter__('languages', () => ['pl-PL']);

      const email = 'john.doe@example.com';
      const password = 'testtest';
      const response = await Authentication.register({ email, password });
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch.mock.calls[0][0]).toBe(
        '/api/user/getLocaleDataFromIp',
      );
      expect(global.fetch.mock.calls[1][0]).toBe('/api/user/register');
      expect(global.fetch.mock.calls[1][1]).toEqual({
        body:
          '{"email":"john.doe@example.com","password":"testtest","locale":"pl_PL","country":"pl","currency":"PLN"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      expect(response).toEqual({ sth: 'sth' });
    });
    it('should throw an error if error message found', async () => {
      const errorObj = {
        error: 'some error',
        message: 'error message',
      };
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() => {
          const p = new Promise(resolve => {
            resolve({
              json() {
                return {
                  data: {
                    country: 'pl',
                    currency: 'PLN',
                  },
                };
              },
            });
          });

          return p;
        })
        .mockImplementationOnce(() => {
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
        await Authentication.register({
          email: 'john.doe@example.com',
          password: 'test',
        });
      } catch (e) {
        expect(e).toEqual(errorObj);
      }
    });
    it('should return correct language', async () => {
      global.fetch = jest
        .fn()
        .mockImplementationOnce(() => {
          const p = new Promise(resolve => {
            resolve({
              json() {
                return {
                  data: {
                    country: 'pl',
                    currency: 'PLN',
                  },
                };
              },
            });
          });

          return p;
        })
        .mockImplementationOnce(() => {
          const p = new Promise(resolve => {
            resolve({
              json() {
                return {
                  data: {
                    sth: 'sth',
                  },
                };
              },
            });
          });

          return p;
        });
      /* eslint-disable no-restricted-properties, no-underscore-dangle */
      global.navigator.__defineGetter__('languages', () => ['pl', 'pl-PL']);

      const email = 'john.doe@example.com';
      const password = 'testtest';
      await Authentication.register({ email, password });
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch.mock.calls[1][1]).toEqual({
        body:
          '{"email":"john.doe@example.com","password":"testtest","locale":"pl_PL","country":"pl","currency":"PLN"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    });
  });
<<<<<<< HEAD
=======
  describe('getConsents', () => {
    const consentsResponse = {
      terms: {
        broadcasterId: 0,
        name: 'terms',
        version: '1',
        value: 'https://cleeng.com/legal',
        label:
          'I accept the <a href="https://cleeng.com/cleeng-user-agreement" target="_blank">Terms and Conditions</a> of Cleeng.',
        required: true,
      },
    };
    it('should call get consents definitions action', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => {
        const p = new Promise(resolve => {
          resolve({
            json() {
              return {
                data: {
                  ...consentsResponse,
                },
              };
            },
          });
        });

        return p;
      });
      const response = await Authentication.getConsents();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/user/getConsents');
      expect(response).toEqual(consentsResponse);
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
        await Authentication.getConsents({
          data: consentsResponse,
        });
      } catch (e) {
        expect(e).toEqual(errorObj);
      }
    });
  });
  describe('submitConsents', () => {
    const email = 'example@email.com';
    const consent = {
      name: 'name',
      version: '1',
      label: 'consent <a href=""> Terms </a>',
      required: false,
    };
    const isChecked = false;
    it('should call submit consents action', async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => {
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
      const response = await Authentication.submitConsent({
        email,
        consent,
        isChecked,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('/api/user/submitConsent', {
        body: JSON.stringify({
          customerEmail: email,
          name: consent.name,
          state: isChecked,
          version: consent.version,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
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
        await Authentication.submitConsent({ email, consent, isChecked });
      } catch (e) {
        expect(e).toEqual(errorObj);
      }
    });
  });
>>>>>>> release
});
