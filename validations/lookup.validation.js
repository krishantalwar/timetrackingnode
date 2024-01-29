const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createLookup = {
    body: Joi.object().keys({
        qs_lookup_key: Joi.string().required(),
        qs_lookup_desc: Joi.string().allow(null, ""),
        qs_lookup_details: Joi.object(),
        status: Joi.string().required().valid(0, 1),

    }),
};

const getLookups = {
    query: Joi.object().keys({
        qs_lookup_key: Joi.string(),
    }),
};

const getLookup = {
    params: Joi.object().keys({
        lookupId: Joi.number().required(),
    }),
};

const updateLookup = {
    params: Joi.object().keys({
        lookupId: Joi.number().required(),
    }),
    body: Joi.object()
        .keys({
            qs_lookup_key: Joi.string(),
            qs_lookup_desc: Joi.string().allow(null, ""),
            qs_lookup_details: Joi.object(),
            status: Joi.string().required().valid(0, 1),
        })
        .min(1),
};

const deleteLookup = {
    params: Joi.object().keys({
        lookupId: Joi.number().required(),
    }),
};

module.exports = {
    createLookup,
    getLookups,
    getLookup,
    updateLookup,
    deleteLookup,
};