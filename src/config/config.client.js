module.exports = {
  checkoutSteps: [
    'login',
    'offerDetails',
    'thankYouPage',
    'badResponsePage',
    'alreadyGranted',
    'register',
    'passwordReset',
  ],
  publisherId: ENV_CONF.PUBLISHER_ID,
  offerId: ENV_CONF.OFFER_ID,
  paymentMethodId: ENV_CONF.PAYMENT_METHOD_ID,
};
