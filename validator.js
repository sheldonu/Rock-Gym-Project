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


// comment validation
const commentValidationRules = () => {
  return [
    // all validations work
    body('message').trim().isLength({ min: 5 }).withMessage("The message is not long enough"),
    body('grade').trim().isLength({ min: 2}).withMessage("enter a grade. ex 5.10"),
    body('name').trim().isLength({ min: 3}).withMessage("The name is not long enough"),
    body('stars').trim().isFloat().withMessage("enter out of 5 starts: ex: 3"),
    body('route_set_id').trim().custom(async (route_set_id) => {
      const routeExists = checkExistingRoute(route_set_id)
      if (routeExists == false){
        throw new Error("The route does not exist please enter a different one")
      }
    })

  ]
}
const routeSetValidationRules = () => {
  return [
    // all validations work
    body('name').trim().isLength({ min: 3 }).withMessage("The name is not long enough"),
    body('grade').trim().isLength({ min: 2}).withMessage("Please enter a grade like 5.10"),
    body('definition').trim().isLength({ min: 5 }).withMessage("Min def is 5 char"),
    body('color').trim().isLength({ min: 3 }).withMessage("Please enter a color"),
    body('route_setter_id').trim().custom(async (route_setter_id) => {
      const setterExists = checkExistingSetter(route_setter_id)
      if (setterExists == false){
        throw new Error("The setter does not exist please enter a different one")
      }
    }),

  ]
}
const setterValidationRules = () => {
  return [
    // all validations work
    body('name').trim().isLength({ min: 2 }).withMessage("The name is not long enough"),
    body('username').trim().isLength({ min: 2 }).withMessage("Please enter a valid username"),
    body('password').trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1
    }).withMessage("The password has to be 6 char in length and contain and upper and lower case letter"),
    body('email').trim()
    .isEmail().withMessage("A valid email is required."),
    body('phoneNumber').trim().isLength({ min: 10 }).withMessage("please enter a valid phone number. min 10: 2053984392"),
  ]
}
const userValidationRules = () => {
  return [
    // all validations work
    body('name').trim().isLength({ min: 2 }).withMessage("the name is not long enough"),
    body('username').trim().isLength({ min: 2 }).withMessage("the username is not long enough"),
    body('password').trim().isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1
    }).withMessage("The password has to be 6 char in length and contain and upper and lower case letter"),
    body('email').trim()
    .isEmail().withMessage("A valid email is required.")
  ]
}


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