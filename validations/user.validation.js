const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        // status: Joi.number().required(),
        employe_code: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        date_of_birth: Joi.string().required(),
        date_of_joining: Joi.string().required(),
        department: Joi.string().required(),
        designation: Joi.string().required(),
        reporting_manager: Joi.string().required(),
        shift_allocation: Joi.string().required(),
        role_assigned: Joi.string().required(),
        upload_documents: Joi.string().required(),
        upload_document: Joi.string().required(),
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