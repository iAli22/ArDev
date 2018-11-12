const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!validator.isLength(data.handle, {min:2 , max: 40})){
    errors.handle = 'handle Must Be Between 2 and 40 characters'
  }
  if(validator.isEmpty(data.handle)){
    errors.handle = 'handle field is Required';
  }
  if(validator.isEmpty(data.status)){
    errors.status = 'Status field is Required';
  }
  if(validator.isEmpty(data.skills)){
    errors.skills = 'skills field is Required';
  }
  if(!isEmpty(data.website)){
    if(!validator.isURL(data.website)) {
      errors.website = 'Not Valid URL'
    }
  }
  if(!isEmpty(data.youtube)){
    if(!validator.isURL(data.youtube)) {
      errors.youtube = 'Not Valid URL'
    }
  }
  if(!isEmpty(data.twitter)){
    if(!validator.isURL(data.twitter)) {
      errors.twitter = 'Not Valid URL'
    }
  }
  if(!isEmpty(data.facebook)){
    if(!validator.isURL(data.facebook)) {
      errors.facebook = 'Not Valid URL'
    }
  }
  if(!isEmpty(data.linkedin)){
    if(!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not Valid URL'
    }
  }
  if(!isEmpty(data.instagram)){
    if(!validator.isURL(data.instagram)) {
      errors.instagram = 'Not Valid URL'
    }
  }
 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
