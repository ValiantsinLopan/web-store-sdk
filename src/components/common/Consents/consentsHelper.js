import { validateConsents } from 'src/services/helper';

export function validateConsentsField(value, consents, t) {
  if (!validateConsents(value, consents)) {
    return t('Please agree on all consents to use this service');
  }

  return '';
}
