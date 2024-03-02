const express = require('express');
const { validate } = require('../../middleware/validate');
const ProfileValidation = require('../../validations/country.validation');
const ProfileController = require('../../controllers/country.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);

// router.post('/:id', validate(ProfileValidation.edit), ProfileController.saveShift);

router.get('/',
    // validate(ProfileValidation.getShift),
    ProfileController.getShift);

module.exports = router;
