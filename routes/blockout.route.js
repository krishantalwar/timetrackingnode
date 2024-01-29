let express = require("express");
let router = express.Router();
let blockoutCtrl = require("../controllers/blockout.ctrl");
const { validate } = require("../utills/validators/validate_validator");
const validation = require("../utills/validators/blockout_validators");
router.post(
  "/",
  validation.saveBlockoutRule(),
  validate,
  blockoutCtrl.saveBlockoutCtrl
);

router.get(
  "/",
  blockoutCtrl.listBlockout
);


module.exports = router;
