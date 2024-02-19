const express = require('express');
const {validate,validateAsync} = require('../../middleware/validate');
const shiftMasterValidation = require('../../validations/shiftMaster.validation');
const shiftMasterController = require('../../controllers/shiftMaster.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
router.post('/add', validateAsync(shiftMasterValidation.add), shiftMasterController.saveShift);
router.get('/', validate(shiftMasterValidation.getShift), shiftMasterController.getShift);

module.exports = router;
