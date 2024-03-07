const express = require('express');
const { validate } = require('../../middleware/validate');
const JobValidation = require('../../validations/job.validation');
const JobController = require('../../controllers/job.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(JobValidation.register), authenticationController.register);

// router.post('/:id', validate(JobValidation.edit), ProfileController.saveShift);

router.get('/',
    // validate(JobValidation.getShift),
    JobController.getShift);

module.exports = router;
