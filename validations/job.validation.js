const Joi = require('joi');
const { checkEmailInUse } = require('./custom.validation');
const db = require("../models");
const User = db.users;

const customMessages = {
    'nameTaken.unique': 'Name is already taken.',
    'any.custom': 'Name is already taken.',
};

const add = {
    body: Joi.object().keys({
        rating: Joi.number().integer().required(),
        sub_location: Joi.number().integer().required(),
        location: Joi.number().integer().required(),
        job_description: Joi.string().required(),
        job_name: Joi.string().required(),
        job_code: Joi.string().required(),
    })
    //     .messages({
    // 'nameTaken.unique': 'Name is already taken.', // Define the error message for 'nameTaken.unique'
    // }),
};

const edit = {
    body: Joi.object().keys({
        rating: Joi.number().integer().required(),
        sub_location: Joi.number().integer().required(),
        location: Joi.number().integer().required(),
        job_description: Joi.string().required(),
        job_name: Joi.string().required(),
        job_code: Joi.string().required(),
        jobid: Joi.number().integer().required(),

    })
    //     .messages({
    // 'nameTaken.unique': 'Name is already taken.', // Define the error message for 'nameTaken.unique'
    // }),
};

const getShift = {
    query: Joi.object().keys({
        id: Joi.required(),
    }),
};

module.exports = {
    edit,
    getShift,
    add
};