import fetch from 'node-fetch';
import { generateBody } from './helper';

class Offer {
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

  async getOfferDetails(ipAddress, couponCode) {
    const results = await fetch(`${this.url}`, {
      ...this.options,
      method: 'POST',
      body: generateBody('getOfferDetails', {
        offerId: this.get('offerId'),
        ipAddress,
        couponCode,
      }),
    });

    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    this.obj = Object.assign(this.obj, resultObj[0].result);

    return this.obj;
  }

  async getPrice({ couponCode, ipAddress }) {
    const results = await fetch(this.url, {
      ...this.options,
      method: 'POST',
      body: generateBody('getPrice', {
        offerId: this.get('offerId'),
        ipAddress,
        couponCode,
      }),
    });

    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  async getCampaignInfo({ couponCode }) {
    const results = await fetch(this.url, {
      ...this.options,
      method: 'POST',
      body: generateBody('getCampaignFromCouponCode', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        couponCode,
      }),
    });
    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  async isTrialAllowed({ email }) {
    const results = await fetch(this.url, {
      ...this.options,
      method: 'POST',
      body: generateBody('isTrialAllowed', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        offerId: this.get('offerId'),
        customerEmail: email,
      }),
    });

    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  async reserveCoupon({ email, couponCode }) {
    const results = await fetch(this.url, {
      ...this.options,
      method: 'POST',
      body: generateBody('reserveCoupon', {
        publisherToken: ENV_CONF.PUBLISHER_TOKEN,
        offerId: this.get('offerId'),
        customerEmail: email,
        coupon: couponCode,
        reservationTime: 24,
      }),
    });

    const resultObj = await results.json();
    if (resultObj[0].error) throw resultObj[0].error;

    return resultObj[0].result;
  }

  get(name) {
    return name ? this.obj[name] : this.obj;
  }
}

export default Offer;
