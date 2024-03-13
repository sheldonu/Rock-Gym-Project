const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    // all validations work
    body('name').isLength({ min: 2 }),
    body('price').isFloat(),
    body('launch_date').isLength({ min: 10}),
    body('image_paths').isArray({ min: 1}),
    body('definition').isLength({ min: 10 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = ["sorry the data was not entered correctly", ]
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}