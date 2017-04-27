import validate from 'validate.js';
import { curry } from 'ramda';

function myValidate(constraints, params, error) {
  const result = validate(params, constraints);
  if (result) throw new error.errorFn(JSON.stringify(result, null, 2));
  return params;
}

const isRequired    = { presence: true };
const isNotRequired = { presence: false };
const primaryKey    = { presence: true, numericality: {onlyInteger: true, greaterThanOrEqualTo: 1}};


const loginConstraints = {
  username: isRequired,
  password: isRequired
};
const registerConstraints = {
  username: isRequired,
  password: isRequired
};

module.exports = {
  validate: curry(myValidate),
  loginConstraints,
  registerConstraints
};