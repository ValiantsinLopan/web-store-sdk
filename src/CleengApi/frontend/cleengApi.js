/* eslint-disable */
class cleengAPI {
  async getCustomer({ customerToken }) {
    const promise = new Promise((resolve, reject) => {
      CleengApi.getCustomer(result => {
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });

    return promise;
  }
}

export default new cleengAPI();
