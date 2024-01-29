const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createCmsPage = {
  body: Joi.object().keys({
    page_title: Joi.string().required(),
    page_subject: Joi.string().required(),
    page_content: Joi.string().required(),
    page_meta_title: Joi.string().allow(null, ""),
    page_meta_desc: Joi.string().allow(null, ""),
  }),
};

const getCmsPages = {
  query: Joi.object().keys({
    search: Joi.string().allow(""),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCmsPage = {
  params: Joi.object().keys({
    cmsPageId: Joi.number(),
  }),
};

const updateCmsPage = {
  params: Joi.object().keys({
    cmsPageId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      page_title: Joi.string(),
      page_subject: Joi.string(),
      page_content: Joi.string(),
      page_meta_title: Joi.string().allow(null, ""),
      page_meta_desc: Joi.string().allow(null, ""),
    })
    .min(1),
};

const deleteCmsPage = {
  params: Joi.object().keys({
    cmsPageId: Joi.number(),
  }),
};

module.exports = {
  createCmsPage,
  getCmsPages,
  getCmsPage,
  updateCmsPage,
  deleteCmsPage,
};
