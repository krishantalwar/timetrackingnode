let express = require("express");
let router = express.Router();
const {
  userSignupRules,
  emailRule,
  userUpdatePasswordRules,
  chnagePassRules,
} = require("../utills/validators/user_validators");
const { validate } = require("../utills/validators/validate_validator");

const adminCtrl = require("../controllers/admin.ctrl");
const { checkAuth } = require("../middleware/auth.middleware");

router.post(
  "/login",
  //  userSignupRules(),
  //   validate,
  adminCtrl.adminLoginCtrl
);
router.post(
  "/forgot_password",
  emailRule(),
  validate,
  adminCtrl.adminForgotPasswordCtrl
);
router.post(
  "/update_password",
  userUpdatePasswordRules(),
  validate,
  adminCtrl.updatePasswordCtrl
);
router.post(
  "/change_password",
  checkAuth,
  //chnagePassRules(), validate,
  adminCtrl.changePasswordCtrl
);

router.get("/dashboard", checkAuth, adminCtrl.dashboardCtrl);

// router.get("/getChart", checkAuth, adminCtrl.getChartCtrl);

module.exports = router;
