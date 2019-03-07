class Authentication {
  constructor() {
    this.url = '/api';
  }
  async login({ email, password }) {
    const result = await fetch(`${this.url}/user/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }

  async getUser({ customerToken }) {
    const result = await fetch(`${this.url}/user`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ customerToken }),
    });
    const json = await result.json();
    return json.data;
  }

<<<<<<< HEAD
=======
  async resetPassword({ email }) {
    const result = await fetch(`${this.url}/user/resetPassword`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }

>>>>>>> release
  getLang() {
    if (navigator.languages !== undefined) {
      const lang = navigator.languages[0];
      const pattern = /-/;
      return pattern.test(lang)
        ? lang.replace('-', '_')
        : navigator.languages[1].replace('-', '_');
    }
    return navigator.language.replace('-', '_');
  }

  async register({ email, password }) {
    let result = await fetch(`${this.url}/user/getLocaleDataFromIp`);
    const country = await result.json();

    result = await fetch(`${this.url}/user/register`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        locale: this.getLang(),
        country: country.data.country,
        currency: country.data.currency,
      }),
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }
<<<<<<< HEAD
=======

  async submitConsent({ email, consent, isChecked }) {
    const result = await fetch(`${this.url}/user/submitConsent`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        customerEmail: email,
        name: consent.name,
        state: isChecked,
        version: consent.version,
      }),
    });
    const json = await result.json();
    if (json.error) {
      throw json;
    }
    return json.data;
  }

  async getConsents() {
    const result = await fetch(`${this.url}/user/getConsents`);
    const json = await result.json();
    return json.data;
  }
>>>>>>> release
}

export default new Authentication();
