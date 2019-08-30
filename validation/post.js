/* eslint-disable */
const Validator = require('validator');
const isEmpty = require('../utils/is-empty');

module.exports = validatePost = (data) => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Content is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
