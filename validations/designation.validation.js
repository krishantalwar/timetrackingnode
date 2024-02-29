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
        name: Joi.string().required(),
        designation_code: Joi.string().required(),

    })
};

const getShift = {
    query: Joi.object().keys({
        search: Joi.string().allow(""),
    }),
};

const getDetail = {
    query: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
const edit = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        designationid: Joi.number().required(),
        designation_code: Joi.string().required(),
    })

};

module.exports = {
    add,
    getShift,
    edit,
    getDetail
};