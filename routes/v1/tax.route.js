const express = require('express');
const { validate } = require('../../middleware/validate');
// const DesignationValidation = require('../../validations/designation.validation');
const TaxController = require('../../controllers/tax.controller');
// const authentication = require('../../middleware/authentication');

const router = express.Router();

// router.post('/register', validate(authenticationValidation.register), authenticationController.register);
router.post('/add',  TaxController.saveShift);

router.get('/code', TaxController.getCode);
router.get('/:id',
    // validate(DesignationValidation.getDetail),
    TaxController.getDetailsById);
router.post('/edit/:id',
    TaxController.editShift);

router.get('/delete/:id',
    // validateAsync(shiftMasterValidation.getDetail),1
    TaxController.deletShift);
router.get('/', TaxController.getShift);


module.exports = router;
