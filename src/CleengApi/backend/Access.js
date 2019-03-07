import fetch from 'node-fetch';
import { generateBody } from './helper';

class Access {
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

  async registerSubscription({ email, offerId, expiresAt }) {
    const results = await fetch(this.url, {
      ...this.options,
      method: 'POST',
      body: generateBody('registerSubscription', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        customerEmail: email,
        offerId,
        expirationDate: expiresAt,
        paymentGateway: 'manual',
        paymentMethod: 'manual',
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }
}

export default new Access();
