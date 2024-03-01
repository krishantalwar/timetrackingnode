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
        last_name: Joi.required(),
        fist_name: Joi.required(),
        email: Joi.required(),
        address: Joi.required(),
        phone: Joi.required(),
        city: Joi.required(),
        state: Joi.required(),
        country: Joi.required(),
        id: Joi.required(),
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
    add,
    getShift
};