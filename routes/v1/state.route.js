const express = require('express');
const { validate } = require('../../middleware/validate');
// const ProfileValidation = require('../../validations/profile.validation');
const ProfileController = require('../../controllers/profile.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);

// router.post('/edit/:id', validate(ProfileValidation.edit), ProfileController.saveShift);

// router.get('/:id',
// validate(ProfileValidation.getShift),
// ProfileController.getShift);

module.exports = router;
