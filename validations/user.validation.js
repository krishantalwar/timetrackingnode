const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        // status: Joi.number().required(),
        employe_code: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        country: Joi.number().integer().required(),
        state: Joi.number().integer().required(),
        date_of_birth: Joi.string().required(),
        date_of_joining: Joi.string().required(),
        department: Joi.number().integer().required(),
        designation: Joi.number().integer().required(),
        reporting_manager: Joi.number().integer().required(),
        shift_allocation: Joi.number().integer().required(),
        role_assigned: Joi.number().integer().required(),
        // upload_documents: Joi.array(),
        // upload_document: Joi.required(),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        search: Joi.string().allow(""),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.number(),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.number(),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            user_info: Joi.object(),
            status: Joi.number()
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.number(),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};