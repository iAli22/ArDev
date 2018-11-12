const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, {min: 5})) {
    errors.text = 'Post Must Be Between up 5 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required To Creat a Post!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
