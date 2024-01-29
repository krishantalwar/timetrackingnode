const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createHelpTopic = {
  body: Joi.object().keys({
    topic: Joi.string().required(),
    description: Joi.string().required(),
    user_type: Joi.string().required().valid("Lookers", "Spotters"),
    status: Joi.number().required(),
  }),
};

const getHelpTopics = {
  query: Joi.object().keys({
    search: Joi.string().allow(""),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHelpTopic = {
  params: Joi.object().keys({
    helpTopicId: Joi.number(),
  }),
};

const updateHelpTopic = {
  params: Joi.object().keys({
    helpTopicId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      topic: Joi.string(),
      description: Joi.string(),
      user_type: Joi.string().valid("Lookers", "Spotters"),
      status: Joi.number(),
    })
    .min(1),
};

const deleteHelpTopic = {
  params: Joi.object().keys({
    helpTopicId: Joi.number(),
  }),
};

module.exports = {
  createHelpTopic,
  getHelpTopics,
  getHelpTopic,
  updateHelpTopic,
  deleteHelpTopic,
};
