const express = require('express');
const { validate } = require('../../middleware/validate');
// const DesignationValidation = require('../../validations/designation.validation');
const UserTypeController = require('../../controllers/userType.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
// router.post('/add', validate(DesignationValidation.add), DesignationController.saveShift);

// router.get('/code', DesignationController.getCode);
// router.get('/:id',
// validate(DesignationValidation.getDetail),
//     DesignationController.getDetailsById);
// router.post('/edit/:id',
//     validate(DesignationValidation.edit),
//     DesignationController.editShift);

router.get('/',
    // validate(DesignationValidation.getShift),
    UserTypeController.getShift);


module.exports = router;
