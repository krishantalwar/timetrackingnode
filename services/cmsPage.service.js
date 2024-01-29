const httpStatus = require("http-status");
var slug = require("slug");
const ApiError = require("../utils/ApiError");

const db = require("../models");
const { aggregatePaging } = require("./aggregatePaging.service");
const CmsPage = db.cmsPage;
const Op = db.Sequelize.Op;

/**
 * Create a cmsPage
 * @param {Object} cmsPageBody
 * @returns {Promise<CmsPage>}
 */
const createCmsPage = async (cmsPageBody) => {
  cmsPageBody.page_url = slug(cmsPageBody.page_title);
  return CmsPage.create(cmsPageBody);
};

/**
 * Query for cmsPages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCmsPages = async (filter, options) => {
  const limit =
    options.limit && parseInt(options.limit, 10) > 0
      ? parseInt(options.limit, 10)
      : 10;
  const page =
    options.page && parseInt(options.page, 10) > 0
      ? parseInt(options.page, 10)
      : 1;
  const offset = (page - 1) * limit;

  let where = {};

  if (filter.search) {
    where = {
      [Op.or]: [
        { page_title: { [Op.iLike]: "%" + filter.search + "%" } },
        { page_subject: { [Op.iLike]: "%" + filter.search + "%" } },
      ],
    };
  }

  const totalResults = await CmsPage.count({
    where,
  });

  const cmsPages = await CmsPage.findAll({
    where,
    order: [["created_on", "DESC"]],
    offset,
    limit,
  });
  return aggregatePaging(totalResults, page, limit, cmsPages);
};

/**
 * Query for user cmsPages
 * @returns {Promise<QueryResult>}
 */
const queryUserCmsPages = async () => {
  const cmsPages = await CmsPage.findAll();
  return cmsPages;
};

/**
 * Get cmsPage by id
 * @param {ObjectId} id
 * @returns {Promise<CmsPage>}
 */
const getCmsPageById = async (id) => {
  return CmsPage.findByPk(id);
};

/**
 * Get cmsPage by page_url
 * @param {string} page_url
 * @returns {Promise<CmsPage>}
 */
const getCmsPageBySlug = async (page_url) => {
  console.log(page_url, "page_url");
  return CmsPage.findOne({ where: { page_url } });
};

/**
 * Update cmsPage by id
 * @param {ObjectId} cmsPageId
 * @param {Object} updateBody
 * @returns {Promise<CmsPage>}
 */
const updateCmsPageById = async (cmsPageId, updateBody) => {
  const cmsPage = await getCmsPageById(cmsPageId);
  if (!cmsPage) {
    throw new ApiError(httpStatus.NOT_FOUND, "Page not found");
  }
  Object.assign(cmsPage, updateBody);
  await cmsPage.save();
  return cmsPage;
};

/**
 * Delete cmsPage by id
 * @param {ObjectId} cmsPageId
 * @returns {Promise<CmsPage>}
 */
const deleteCmsPageById = async (cmsPageId) => {
  const cmsPage = await getCmsPageById(cmsPageId);
  if (!cmsPage) {
    throw new ApiError(httpStatus.NOT_FOUND, "Page not found");
  }
  await cmsPage.destroy();
  return cmsPage;
};

module.exports = {
  createCmsPage,
  queryCmsPages,
  getCmsPageById,
  getCmsPageBySlug,
  updateCmsPageById,
  deleteCmsPageById,
  queryUserCmsPages,
};
