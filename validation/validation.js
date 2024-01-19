const { body, validationResult } = require('express-validator');

const validateRequestBody = [
  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
  body('status').notEmpty().withMessage('Status is required'),
  body('hired_on').notEmpty().withMessage('Hired On is required'),
];

module.exports = {validateRequestBody, validationResult}
