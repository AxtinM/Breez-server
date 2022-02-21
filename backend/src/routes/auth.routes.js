const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");

const {
  signUpController,
  signInController,
  signOutController,
} = require("../controllers/auth.controller");
const {
  validateUserSignUp,
  validateUserSignIn,
  userValidation,
} = require("../middleware/validation/user");

router.post("/signup", validateUserSignUp, userValidation, signUpController);
router.post("/signin", validateUserSignIn, userValidation, signInController);
router.post("/signout", isAuth, signOutController);

// router.post("/create", isAuth, (req, res) => {
//   res.send(req.user);
// });

module.exports = router;
