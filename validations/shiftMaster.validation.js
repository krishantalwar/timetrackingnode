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
        break_end_time: Joi.string().required(),
        break_start_time: Joi.string().required(),
        end_time: Joi.string().required(),
        start_time: Joi.string().required(),
        overtime_end_time: Joi.string().required(),
        overtime_start_time: Joi.string().required(),
        name: Joi.string().required(),
        // name: Joi.string().required().external(async (name,helpers) => {
        // You have to create `checkEmailInUse` funciton somewhere in your code and call it here
        //         const isNamenUse = await User.isNmailTakenWith(name);
        //         console.log(isNamenUse);
        //             if(isNamenUse) {
        //                  return helpers.error('nameTaken.unique',{message:"Name is already taken"});
        //             }

        //         return name;
        // }).messages({
        //     'nameTaken.unique': 'Name is already taken.', // Define the error message for 'nameTaken.unique'
        // })
        //   name: Joi.string().required().custom(checkEmailInUse,'asd'),

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

const getDetail = {
    query: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
const edit = {
    body: Joi.object().keys({
        break_end_time: Joi.string().required(),
        break_start_time: Joi.string().required(),
        end_time: Joi.string().required(),
        start_time: Joi.string().required(),
        overtime_end_time: Joi.string().required(),
        overtime_start_time: Joi.string().required(),
        name: Joi.string().required(),
        // id: Joi.string().required(),

    })

};

module.exports = {
    add,
    getShift,
    getDetail,
    edit
};