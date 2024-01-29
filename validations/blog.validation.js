const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createBlog = {
  body: Joi.object().keys({
    blog_category_id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.number().required(),
    image: Joi.object(),
  }),
};

const getBlogs = {
  query: Joi.object().keys({
    search: Joi.string().allow(""),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBlog = {
  params: Joi.object().keys({
    blogId: Joi.number(),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      blog_category_id: Joi.number(),
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.number(),
      image: Joi.object(),
    })
    .min(1),
};

const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.number(),
  }),
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
