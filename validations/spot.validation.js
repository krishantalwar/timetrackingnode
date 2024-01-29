const Joi = require('joi');


const getSpots = {
    query: Joi.object().keys({
        search: Joi.string().allow(""),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};
const deleteSpot = {
    params: Joi.object().keys({
        spotId: Joi.string().required(),
    }),
};


module.exports = {

    getSpots,
    deleteSpot
};