const { body } = require('express-validator')
module.exports.lookupValidationRules = () => {
  return [
    body('title').isString().isLength({min:3}).trim(),
    body('description').isString().trim(),
    body('status').isInt(),
    body('picture').isString().trim(),
    body('key').isString().trim(),
  ]
}
