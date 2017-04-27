import customError from 'custom-error';

const InvalidLogin = makeError(
  'InvalidLogin',
  'Username/password combination is incorrect'
);
const InvalidRegistration = makeError(
  'InvalidRegistration',
  'Registration could not be completed. Please check username and password'
);

function makeError(name, message) {
  return { errorFn: customError(name), message };
}

module.exports = {
  InvalidLogin,
  InvalidRegistration
};
