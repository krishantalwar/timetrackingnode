const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createEmailTemplate = {
  body: Joi.object().keys({
    email_action: Joi.object().required(),
    email_title: Joi.string().required(),
    email_subject: Joi.string().required(),
    email_body: Joi.string().required(),
    email_keywords: Joi.string().required(),
    status: Joi.number().required(),
  }),
};

const getEmailTemplates = {
  query: Joi.object().keys({
    search: Joi.string().allow(""),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEmailTemplate = {
  params: Joi.object().keys({
    emailTemplateId: Joi.number(),
  }),
};

const updateEmailTemplate = {
  params: Joi.object().keys({
    emailTemplateId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      email_action: Joi.object(),
      email_title: Joi.string(),
      email_subject: Joi.string(),
      email_body: Joi.string(),
      email_keywords: Joi.string(),
      status: Joi.number(),
    })
    .min(1),
};

const deleteEmailTemplate = {
  params: Joi.object().keys({
    emailTemplateId: Joi.number(),
  }),
};

module.exports = {
  createEmailTemplate,
  getEmailTemplates,
  getEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
};
