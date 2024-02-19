const express = require('express');
const {validate} = require('../../middleware/validate');
const DepartmentValidation = require('../../validations/department.validation');
const DepartmentController = require('../../controllers/department.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
router.post('/add', validate(DepartmentValidation.add), DepartmentController.saveShift);
router.get('/', validate(DepartmentValidation.getShift), DepartmentController.getShift);

module.exports = router;
