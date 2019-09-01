/* eslint-disable */
const Validator = require('validator');
const isEmpty = require('../utils/is-empty');

module.exports = validateContact = (data) => {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.message = !isEmpty(data.message) ? data.message : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Your name is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Your email is not valid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Your email is required';
  }

  if (!Validator.isLength(data.message, { min: 20, max: 500 })){
    errors.message = 'Your message should be at least 20 characters long';
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = 'Your message is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
