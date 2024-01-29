const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createFaq = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    status: Joi.number().required(),
  }),
};

const getFaqs = {
  query: Joi.object().keys({
    search: Joi.string().allow(""),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFaq = {
  params: Joi.object().keys({
    faqId: Joi.number(),
  }),
};

const updateFaq = {
  params: Joi.object().keys({
    faqId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      question: Joi.string(),
      answer: Joi.string(),
      status: Joi.number(),
    })
    .min(1),
};

const deleteFaq = {
  params: Joi.object().keys({
    faqId: Joi.number(),
  }),
};

module.exports = {
  createFaq,
  getFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
};
