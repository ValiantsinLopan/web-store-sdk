export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  const re = /[0-9]+/;
  return re.test(password) && password.length >= 6;
}

export function hasNumber(myString) {
  return /\d/.test(myString);
}

export function checkPassword(password) {
  return hasNumber(password) && password.length > 5;
}
