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
        role_id: Joi.required(),
        screen_id: Joi.required(),
    })
    //     .messages({
    // 'nameTaken.unique': 'Name is already taken.', // Define the error message for 'nameTaken.unique'
    // }),
};

const getShift = {
    query: Joi.object().keys({
        search: Joi.string().allow(""),
    }),
};

module.exports = {
    add,
    getShift
};