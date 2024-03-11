const express = require('express');
const auth = require('../../middleware/authentication');
const { validate, validateAsync } = require('../../middleware/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.get('/code', userController.getCode);

router
    .route('/')
    // .post(
    //     //auth('manageUsers'), 
    //     validate(userValidation.createUser), userController.createUser)
    .get(
        //auth('getUsers'),
        validate(userValidation.getUsers), userController.getUsers);

router
    .route('/create')
    .post(
        //auth('manageUsers'), 
        // validate(userValidation.createUser),
        userController.createUser)

router
    .route('/:userId')
    .get(
        //auth('getUsers'), 
        validate(userValidation.getUser), userController.getUser)
    .patch(
        // auth('manageUsers'),
        validate(userValidation.updateUser), userController.updateUser)
    .delete(
        // auth('manageUsers'), 
        validate(userValidation.deleteUser), userController.deleteUser);

router
    .route('/export/users')
    .get(
        //auth('getUsers'),
        userController.getExportUsers);

module.exports = router;