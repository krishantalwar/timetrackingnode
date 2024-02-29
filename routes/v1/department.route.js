const express = require('express');
const { validate } = require('../../middleware/validate');
const DepartmentValidation = require('../../validations/department.validation');
const DepartmentController = require('../../controllers/department.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
router.post('/add', validate(DepartmentValidation.add), DepartmentController.saveShift);

router.get('/code', DepartmentController.getCode);
router.get('/:id',
    // validate(DesignationValidation.getDetail),
    DepartmentController.getDetailsById);
router.post('/edit/:id',
    validate(DepartmentValidation.edit),
    DepartmentController.editShift);

router.get('/delete/:id',
    // validateAsync(shiftMasterValidation.getDetail),1
    DepartmentController.deletShift);
router.get('/', validate(DepartmentValidation.getShift), DepartmentController.getShift);

module.exports = router;
