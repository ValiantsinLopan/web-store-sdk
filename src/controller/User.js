/* eslint-disable */
import express from 'express';
import { User } from '../CleengApi/backend';

class UserController {
  constructor() {
    this.routing = express();
    this.routing.post('/login', UserController.login);
    this.routing.post('/', UserController.get);
    this.routing.post('/register', UserController.register);
    this.routing.post('/resetPassword', UserController.resetPassword);
    this.routing.get(
      '/getLocaleDataFromIp',
      UserController.getLocaleDataFromIp,
    );
    this.routing.get('/getConsents', UserController.getConsents);
    this.routing.post('/submitConsent', UserController.submitConsent);
  }

  static async login(req, res) {
    try {
      var respond = await User.getCustomerToken({
        email: req.body.email,
        password: req.body.password,
      });
    } catch (error) {
      return res.json({ error: 'not allow', ...error }, 401);
    }
    res.json({ data: respond });
  }

  static async getLocaleDataFromIp(req, res) {
    try {
      var respond = await User.getLocaleDataFromIp(
        req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      );
    } catch (error) {
      return res.json({ error: 'not allow' });
    }
    res.json({ data: respond });
  }

  static async register(req, res, next) {
    try {
      var respond = await User.registerCustomer(req.body);
    } catch (error) {
      return res.status(401).json({ error: 'not allow', ...error });
    }
    res.json({ data: respond });
  }

  static async get(req, res) {
    try {
      var respond = await User.getCustomer(req.body);
    } catch (error) {
      console.log({ error });
      return res.json({ error: 'not allow' });
    }
    res.json({ data: respond });
  }

  static async getConsents(req, res) {
    try {
      var respond = await User.getConsents();
    } catch (error) {
      return res.json({ error: 'not allow', ...error }, 401);
    }
    res.json({ data: respond });
  }

  static async submitConsent(req, res) {
    try {
      var respond = await User.submitConsent(req.body);
    } catch (error) {
      return res.json({ error: 'not allow', ...error }, 401);
    }
    res.json({ data: respond });
  }

  static async resetPassword(req, res) {
    try {
      var respond = await User.resetPassword({
        email: req.body.email
      });
    } catch (error) {
      return res.json({ error: 'error', ...error }, 404);
    }
    res.json({ data: respond });
  }
}

export default new UserController();
