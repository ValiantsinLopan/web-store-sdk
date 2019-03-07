/* eslint-disable consistent-return */
import express from 'express';
import { Offer } from '../CleengApi/backend';

class OfferController {
  constructor() {
    this.routing = express();
    this.routing.get('/coupon', OfferController.getCampaignInfo);
    this.routing.get('/:offerId', OfferController.getOfferDetails);
    this.routing.get('/:offerId/hasTrial', OfferController.isTrialAllowed);
    this.routing.post('/:offerId/coupon', OfferController.reserveCoupon);
    this.routing.get('/:offerId/price', OfferController.getPrice);
  }

  static async getOfferDetails(req, res) {
    const offer = new Offer({ offerId: req.params.offerId });
    const ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    try {
      await offer.getOfferDetails(ipAddress);

      res.json({ ...offer.get() });
    } catch (error) {
      return res.status(404).json({ error: 'get offer error', ...error });
    }
    return false;
  }

  static async getPrice(req, res) {
    const offer = new Offer({ offerId: req.params.offerId });
    const ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let respond;
    try {
      respond = await offer.getPrice({
        couponCode: req.query.coupon,
        ipAddress,
      });
    } catch (error) {
      return res.json({ error: 'error', ...error }, 404);
    }
    res.json({ data: respond });
  }

  static async getCampaignInfo(req, res) {
    const offer = new Offer();
    let respond;
    try {
      respond = await offer.getCampaignInfo({
        couponCode: req.query.coupon,
      });
    } catch (error) {
      return res.json({ error: 'error', ...error }, 404);
    }
    res.json({ data: respond });
  }

  static async isTrialAllowed(req, res) {
    const offer = new Offer({ offerId: req.params.offerId });
    let respond;
    try {
      respond = await offer.isTrialAllowed({
        email: decodeURIComponent(req.query.email),
      });
    } catch (error) {
      return res.json({ error: 'trial error', ...error }, 401);
    }
    res.json({ data: respond });
  }

  static async reserveCoupon(req, res) {
    const offer = new Offer({ offerId: req.params.offerId });
    let respond;
    try {
      respond = await offer.reserveCoupon({
        email: decodeURIComponent(req.body.email),
        couponCode: req.body.couponCode,
      });
    } catch (error) {
      return res.json({ error: 'Coupon code', ...error }, 404);
    }
    res.json({ data: respond });
  }
}

export default new OfferController();
