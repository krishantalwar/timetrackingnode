const { body, check } = require("express-validator");

const userValidationRules = () => {
  return [
    check("firstName", "It should contain minimum 3 characters")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    // body('firstName').isString().isLength({min:3}).trim().withMessage('It should contain minimum 3 characters'),
    body("lastName")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("It should contain minimum 3 characters"),
    body("countryCode").isString().trim(),
    body("phone_number")
      .isString()
      .isLength({ min: 8, max: 15 })
      .trim()
      .withMessage("It should contain minimum 8 and maximum 15 characters"),
    body("cpfNumber")
      .isString()
      .isLength({ min: 3, max: 20 })
      .trim()
      .withMessage("It should contain minimum 3 and maximum 10 characters"),
    body("dateOfBirth").isDate(),
    body("companyName")
      .isLength({ min: 3 })
      .withMessage("It should contain minimum 3 characters")
      .trim(),
    body("knowSource").isLength({ min: 3 }).trim(),
  ];
};

const userSignupRules = () => {
  return [
    check("email", "Please enter a Valid email").isEmail().not().isEmpty(),
    check("password", "Please enter a valid password").isStrongPassword({
      minLowercase: 0,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
      minLength: 8,
    }),
  ];
};

const userVerifyRules = () => {
  return [
    check("email", "Please enter a Valid email").isEmail().not().isEmpty(),
    // check("code", "Please enter a valid code").isInt().notEmpty()
  ];
};
const emailRule = () => {
  return [
    check("email", "Please enter a Valid email").isEmail().not().isEmpty(),
  ];
};

const userUpdatePasswordRules = () => {
  return [
    check("email", "Please enter a Valid email").isEmail().not().isEmpty(),
    check("password", "Please enter a valid password").isStrongPassword({
      minLowercase: 0,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
      minLength: 8,
    }),
    check("key", "Please enter valid key").notEmpty(),
  ];
};
const chnagePassRules = () => {
  return [
    check("oldPassword", "Please enter a valid password").isStrongPassword({
      minLowercase: 0,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
      minLength: 8,
    }),
    check("newPassword", "Please enter a valid password").isStrongPassword({
      minLowercase: 0,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
      minLength: 8,
    }),
  ];
};

const updateProfileRule = () => {
  return [
    check("first_name").notEmpty().withMessage("First Name is required"),
    check("last_name").notEmpty().withMessage("Last Name is required"),
    check("mobile").notEmpty().withMessage("Phone no. is required"),
  ];
};

module.exports = {
  userValidationRules,
  userSignupRules,
  userVerifyRules,
  emailRule,
  userUpdatePasswordRules,
  chnagePassRules,
  updateProfileRule,
};
