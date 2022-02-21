const { check } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name is required!")
    .isString()
    .withMessage("must be a valid first name")
    .isLength({ min: 3, max: 20 })
    .withMessage("First Name must be within 3 to 20 character!"),
  check("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last Name is required!")
    .isString()
    .withMessage("must be a valid last name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last Name must be within 3 to 20 character!"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Empty!")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be 6 to 20 characters long!"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both passwords must be the same!");
      }
      return true;
    }),
];

exports.validateUserSignIn = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email and/or Password must be Correct!"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email and/or Password must be Correct!"),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  console.log(result);
  const error = result[0].msg;
  res.send({ success: false, message: error });
};
