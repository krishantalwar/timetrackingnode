const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/lookup.ctrl')
const {lookupValidationRules} = require('../utills/validators/lookup_validators');
const { validate } = require('../utills/validators/validate_validator');
router.get('/all_lookup/:key',ctrl.allCtrl);
router.post('/add_lookup',ctrl.addCtrl);
router.post('/update_lookup/:id',lookupValidationRules(), validate ,ctrl.updateCtrl);
router.delete('/delete_lookup/:id',ctrl.removeCtrl)
module.exports = router;
