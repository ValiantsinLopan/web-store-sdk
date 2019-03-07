import fetch from 'node-fetch';

class Payment {
  constructor(obj) {
    this.url = ENV_CONF.BACKEND_CONF.CLEENG_API_PAYMENTS_URL;
    this.options = {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'X-Publisher-Token': ENV_CONF.PUBLISHER_TOKEN,
        accept: 'application/json',
      },
    };
    this.obj = { ...obj };
  }

  async createOrderFromOffer({
    paymentMethodId,
    customerId,
    offerId,
    currency,
    country,
  }) {
    const results = await fetch(`${this.url}/orders/create_using_offer`, {
      ...this.options,
      method: 'POST',
      body: JSON.stringify({
        paymentMethodId,
        customerId,
        offerId,
        currency,
        country,
      }),
    });
    const resultObj = await results.json();
    if (resultObj.error) throw resultObj.error;
    return resultObj;
  }
}

export default new Payment();
