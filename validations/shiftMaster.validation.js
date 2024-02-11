const Joi = require('joi');
const { password } = require('./custom.validation');

const add = {
    body: Joi.object().keys({
        break_end_time: Joi.string().required(),
      break_start_time: Joi.string().required(),
      end_time: Joi.string().required(),
      start_time: Joi.string().required(),
      overtime_end_time: Joi.string().required(),
      overtime_start_time: Joi.string().required(),
      name: Joi.string().required(),
        
    }),
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