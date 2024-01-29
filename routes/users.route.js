let express = require("express");
const passport = require("passport");
let router = express.Router();
let userCtrl = require("../controllers/user.ctrl");
const {
  userValidationRules,
  userSignupRules,
  userVerifyRules,
  emailRule,
  userUpdatePasswordRules,
  chnagePassRules,
  updateProfileRule,
} = require("../utills/validators/user_validators");
const { validate } = require("../utills/validators/validate_validator");
const { uploadImage } = require("../middleware/upload-middleware");
const { checkAuth } = require("../middleware/auth.middleware");
require("../middlewares/sociallogin.middleware");

// router.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// router.use(passport.session());

// router.get("/failed", (req, res) => res.send("You Failed to log in!"));

// router.get(
//   "/good",
//   (req, res, next) => {
//     next();
//   },
//   userCtrl.socialLoginCtrl
// );

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/users/failed" }),
//   (req, res) => {
//     res.redirect("/users/good");
//   }
// );

// router.get(
//   "/facebook",
//   passport.authenticate("facebook", { scope: ["public_profile", "email"] })
// );

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/users/good",
//     failureRedirect: "/users",
//   })
// );

// router.post("/saveSocialLogin",userCtrl.socialLoginCtrl);

router.post("/login", userSignupRules(), validate, userCtrl.loginCtrl);
router.post("/signup", userSignupRules(), validate, userCtrl.signupCtrl);
router.post(
  "/verify_user",
  userVerifyRules(),
  validate,
  userCtrl.verifyUserCtrl
);

router.post(
  "/forgot_password",
  emailRule(),
  validate,
  userCtrl.forgotPasswordCtrl
);

// router.post('/verify_user_password', userCtrl.verifyUserPasswordCtrl);

router.post(
  "/update_password",
  userUpdatePasswordRules(),
  validate,
  userCtrl.updatePasswordCtrl
);

router.post(
  "/change_password",
  checkAuth,
  //chnagePassRules(), validate,
  userCtrl.changePasswordCtrl
);

router.post("/resend_verification_code/:id", userCtrl.resentOTPCtrl);

router.post("/complete_your_profile/:id", userCtrl.completeProfileCtrl);
router.get("/complete_user_info/:id", userCtrl.getCompleteProfileDataCtrl);

router.post(
  "/update_profile",
  checkAuth,
  //updateProfileRule(),
  validate,
  userCtrl.updateUserProfileCtrl
);

module.exports = router;
