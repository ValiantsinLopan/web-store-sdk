import express from 'express';
import { Access, Payment } from '../CleengApi/backend';

class AccessController {
  constructor() {
    this.routing = express();
    this.routing.post(
      '/registerSubscription',
      AccessController.registerSubscription,
    );
    this.routing.post(
      '/createOrderFromOffer',
      AccessController.createOrderFromOffer,
    );
  }

  /* eslint-disable consistent-return */
  static async registerSubscription(req, res) {
    let respond;
    try {
      respond = await Access.registerSubscription({
        email: req.body.email,
        expiresAt: req.body.expiresAt,
        offerId: req.body.offerId,
      });
    } catch (error) {
      return res.json({ error: 'error', ...error }, 404);
    }
    res.json({ data: respond });
  }

  static async createOrderFromOffer(req, res) {
    let respond;
    try {
      respond = await Payment.createOrderFromOffer({
        paymentMethodId: req.body.paymentMethodId,
        customerId: req.body.customerId,
        offerId: req.body.offerId,
        currency: req.body.currency,
        country: req.body.country,
      });
    } catch (error) {
      return res.json({ error: 'error', ...error }, 404);
    }
    res.json({ data: respond });
  }
}

export default new AccessController();
