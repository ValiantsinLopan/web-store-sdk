export function getOfferDescription(t, offerType, data) {
  const passInfo = {
    day: t('Access for 24 hours'),
    week: t('Access for one week'),
    '2weeks': t('Access for two weeks'),
    month: t('Access for one month'),
    '3months': t('Access for 3 months'),
    '6months': t('Access for 6 months'),
    year: t('Access for one year'),
    custom: t('Access until {{date}}', {
      date: new Date(data.expiresAt * 1000).toLocaleString(),
    }),
  };
  const subscriptionInfo = {
    week: t('Weekly plan.'),
    month: t('Monthly plan.'),
    '3months': t('3-month plan.'),
    '6months': t('6-month plan.'),
    year: t('Annual plan.'),
  };
  const offerTypesTranslations = {
    subscription: `${subscriptionInfo[data.offerPeriod]} ${t(
      'Renews automatically. Cancel anytime you want.',
    )}`,
    single: t('Unlimited access.'),
    rental:
      data.offerPeriod > 72
        ? t('Video rental {{days}} days', {
            days: Math.floor(data.offerPeriod / 24),
          })
        : t('Video rental {{hours}}h', { hours: data.offerPeriod }),
    pass: data.offerPeriod ? passInfo[data.offerPeriod] : passInfo.custom,
    default: t('This is not a valid offer.'),
  };

  return offerTypesTranslations[offerType];
}

export function getOfferType(offerId) {
  const type = {
    single: 'A',
    rental: 'R',
    pass: 'P',
    subscription: 'S',
    event: 'E',
  };
  const letter = offerId.charAt(0);
  const nameOfTypeOffer = Object.keys(type).find(el => type[el] === letter);

  return nameOfTypeOffer;
}
