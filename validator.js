const { body, validationResult } = require('express-validator')
const mongodb = require('./db/connect');
const {ObjectId} = require('mongodb');

// update validations rules ------------------------
// Define validation rules
const updateSetterValidationRules = [
  body('name').notEmpty(),
  body('username').notEmpty(),
  body('password').notEmpty(),
  body('email').notEmpty(),
  body('phoneNumber').notEmpty()
];

// Define validation rules
const updateRouteValidationRules = [
  body('name').notEmpty(),
  body('grade').notEmpty(),
  body('route_setter_id').notEmpty(),
  body('definition').notEmpty(),
  body('color').notEmpty()
];

// Define validation rules
const updateUserValidationRules = [
  body('name').notEmpty(),
  body('username').notEmpty(),
  body('password').notEmpty(),
  body('email').notEmpty(),
  body('route_sent_id').notEmpty()
];


// Define validation rules
const updateCommentValidationRules = [
  body('message').notEmpty(),
  body('grade').notEmpty(),
  body('name').notEmpty(),
  body('stars').isInt({ min: 1, max: 5 }),
  body('route_set_id').notEmpty()
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


async function checkExistingSetter(route_setter_id){
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('route_setter')
      .find({ _id: route_setter_id });

    if(result){
      return true
    }else{
      return false
    }
  }catch{
    return false
  }
}

async function checkExistingRoute(route_id){
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('routes_set')
      .find({ _id: route_id });

    if(result){
      return true
    }else{
      return false
    }
  }catch{
    return false
  }
}

module.exports = {
  updateCommentValidationRules,
  handleValidationErrors,
  updateSetterValidationRules,
  updateUserValidationRules,
  updateRouteValidationRules,
}