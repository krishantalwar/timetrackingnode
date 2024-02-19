const express = require('express');
const {validate} = require('../../middleware/validate');
const DesignationValidation = require('../../validations/designation.validation');
const DesignationController = require('../../controllers/designation.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
router.post('/add', validate(DesignationValidation.add), DesignationController.saveShift);
router.get('/', validate(DesignationValidation.getShift), DesignationController.getShift);

module.exports = router;
