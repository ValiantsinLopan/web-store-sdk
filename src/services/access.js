import { offerId, paymentMethodId } from 'src/config/config.client';

class Access {
  constructor() {
    this.url = '/api';
  }
  async registerSubscription({ email, expiresAt }) {
    const result = await fetch(`${this.url}/access/registerSubscription`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        offerId,
        expiresAt,
      }),
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }
  async createOrderFromOffer({ customerId, currency, country }) {
    const result = await fetch(`${this.url}/access/createOrderFromOffer`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        paymentMethodId,
        customerId,
        offerId,
        currency,
        country,
      }),
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }
}

export default new Access();
