import fetch from 'node-fetch';
import { generateBody } from './helper';

class User {
  constructor(obj) {
    this.url = ENV_CONF.BACKEND_CONF.CLEENG_API_FULL_URL;
    this.options = {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    };
    this.obj = { ...obj };
  }

  async getCustomerToken({ email, password }) {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: generateBody('generateCustomerTokenFromPassword', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        customerEmail: email,
        password,
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  async registerCustomer(data) {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: generateBody('registerCustomer', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        customerData: data,
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  async getCustomer({ customerToken }) {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: generateBody('getCustomer', {
        customerToken,
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }
  async getLocaleDataFromIp(ipAddress) {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: JSON.stringify([
        {
          method: 'getLocaleDataFromIp',
          params: {
            ipAddress,
          },
          jsonrpc: '2.0',
          id: 1,
        },
      ]),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }
<<<<<<< HEAD
=======

  async getConsents() {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: generateBody('getConsentDefinitions', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  async submitConsent({ customerEmail, name, state, version }) {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: generateBody('submitConsent', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        customerEmail,
        name,
        state,
        version,
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  async resetPassword({ email }) {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: generateBody('requestPasswordReset', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        customerEmail: email,
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }
>>>>>>> release
}

export default new User();
