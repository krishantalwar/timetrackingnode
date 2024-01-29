let express = require("express");
let router = express.Router();
let referralCtrl = require("../controllers/referral.ctrl");
const { validate } = require("../utills/validators/validate_validator");

router.post("/sendmail", referralCtrl.sendReferralEmail);

module.exports = router;
