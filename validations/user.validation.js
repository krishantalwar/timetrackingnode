const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        user_info: Joi.object().required(),
        status: Joi.number().required(),
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