const express = require("express");
const { validate, validateAsync } = require("../../middleware/validate");
const JobValidation = require("../../validations/job.validation");
const JobController = require("../../controllers/job.controller");
// const authentication = require('../../middleware/authentication');

const router = express.Router();

router.post("/add", validateAsync(JobValidation.add), JobController.saveShift);
router.get("/code", JobController.getCode);

router.get(
    "/",
    // validate(JobValidation.getShift),
    JobController.getShift
);


router.get('/jobhistory',
    // validate(shiftMasterValidation.getDetail),
    JobController.jobhistory);

router.get('/:id',
    // validate(shiftMasterValidation.getDetail),
    JobController.getDetailsById);

router.post("/edit/:id", validate(JobValidation.edit), JobController.editShift);

router.get(
    "/delete/:id",
    // validateAsync(shiftMasterValidation.getDetail),1
    JobController.deletShift
);


router.post('/assignedjob/:id',
    // validate(shiftMasterValidation.getDetail),
    JobController.assignedJob);

// userjob
router.get('/userjob/:id',
    // validate(shiftMasterValidation.getDetail),
    JobController.getuserjob);


router.post('/savetime',
    // validate(shiftMasterValidation.getDetail),
    JobController.saveTime);


router.post('/payjob',
    // validate(shiftMasterValidation.getDetail),
    JobController.payjob);


module.exports = router;

// const express = require('express');
// const { validate, validateAsync } = require('../../middleware/validate');
// const shiftMasterValidation = require('../../validations/shiftMaster.validation');
// const shiftMasterController = require('../../controllers/shiftMaster.controller');
// // const authentication = require('../../middleware/authentication');

// const router = express.Router();

// // router.post('/register', validate(authenticationValidation.register), authenticationController.register);

// router.post('/add', validateAsync(shiftMasterValidation.add), shiftMasterController.saveShift);
// router.get('/code', shiftMasterController.getCode);
// router.get('/:id',
//     // validate(shiftMasterValidation.getDetail),
//     shiftMasterController.getDetailsById);
// router.post('/edit/:id',
//     validate(shiftMasterValidation.edit),
//     shiftMasterController.editShift);

// router.get('/delete/:id',
//     // validateAsync(shiftMasterValidation.getDetail),1
//     shiftMasterController.deletShift);
// router.get('/', validate(shiftMasterValidation.getShift), shiftMasterController.getShift);
// module.exports = router;
