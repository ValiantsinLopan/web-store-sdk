import { validateEmail } from 'src/services/helper';

export function validateEmailField(value, t) {
  let message = '';
  if (!validateEmail(value)) {
    message = t('The email address is not properly formatted.');
  }
  if (value === '') {
    message = t('Please fill out this field.');
  }

  return message;
}
