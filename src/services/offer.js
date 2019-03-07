class Offer {
  constructor() {
    this.url = '/api/offer';
  }

  async getOffer(offerId, abortController) {
    const result = await fetch(`${this.url}/${offerId}`, {
      signal: abortController && abortController.signal,
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json;
  }

  async getPrice(offerId, couponCode) {
    const result = await fetch(
      `${this.url}/${offerId}/price?coupon=${couponCode}`,
    );
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }

  async checkIfHasTrial(offerId, email) {
    const encodedEmail = encodeURIComponent(email);
    const result = await fetch(
      `${this.url}/${offerId}/hasTrial?email=${encodedEmail}`,
    );
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }

  async getCampaignInfo(couponCode) {
    const result = await fetch(`${this.url}/coupon?coupon=${couponCode}`);
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }

  async reserveCoupon(offerId, email, couponCode) {
    const result = await fetch(`${this.url}/${offerId}/coupon`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, couponCode }),
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }
}

export default new Offer();
