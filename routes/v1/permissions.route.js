const express = require('express');
const {validate} = require('../../middleware/validate');
const PermissionsValidation = require('../../validations/permissions.validation');
const PermissionsController = require('../../controllers/permissions.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
router.post('/add', validate(PermissionsValidation.add), PermissionsController.saveShift);
router.get('/', validate(PermissionsValidation.getShift), PermissionsController.getShift);

module.exports = router;
