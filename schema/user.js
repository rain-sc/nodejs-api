const joi = require('joi')

const username = joi.string().alphanum().min(5).max(10).required().messages({
  'string.alphanum': 'Username must only contain alphanumeric characters.',
  'string.min': 'Username must be at least 5 characters long.',
  'string.max': 'Username must not exceed 10 characters.',
  'any.required': 'Username is required.'
});
const password = joi.string().pattern(/^[\S]{6,12}$/).required().messages({
  'string.pattern.base': 'Password must be between 6 and 12 characters and contain no spaces.',
  'any.required': 'Password is required.'
});

exports.regUserSchema = {
  body:{  
    username,
    password
  }
}