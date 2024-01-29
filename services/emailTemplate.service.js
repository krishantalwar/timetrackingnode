const httpStatus = require("http-status");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const { aggregatePaging } = require("./aggregatePaging.service");

const EmailTemplate = db.emailTemplate;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

/**
 * Create a email Template
 * @param {Object} emailTemplateBody
 * @returns {Promise<EmailTemplate>}
 */
const createEmailTemplate = async (emailTemplateBody) => {
  if (
    await EmailTemplate.isEmailTemplateExist(
      emailTemplateBody.email_action.value
    )
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email template already taken.");
  }
  return EmailTemplate.create(emailTemplateBody);
};

/**
 * Query for
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEmailTemplates = async (filter, options) => {
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
        { email_title: { [Op.iLike]: "%" + filter.search + "%" } },
        { email_subject: { [Op.iLike]: "%" + filter.search + "%" } },
      ],
    };
  }

  const totalResults = await EmailTemplate.count({ where });

  const blogs = await EmailTemplate.findAll({
    where,
    attributes: { exclude: ["modified_by", "deleted_by", "is_deleted"] },
    order: [["created_on", "DESC"]],
    offset,
    limit,
  });
  return aggregatePaging(totalResults, page, limit, blogs);
};

/**
 * Get emailTemplate by id
 * @param {ObjectId} id
 * @returns {Promise<EmailTemplate>}
 */
const getEmailTemplateById = async (id) => {
  return EmailTemplate.findByPk(id, {
    attributes: { exclude: ["modified_by", "deleted_by", "is_deleted"] },
  });
};

/**
 * Get emailTemplate by action
 * @param {ObjectId} id
 * @returns {Promise<EmailTemplate>}
 */
const getEmailTemplateByAction = async (action) => {
  return EmailTemplate.findOne({
    where: { "email_action.value": action, status: 1 },
    raw: true,
  });
};

/**
 * Update email template by id
 * @param {ObjectId} emailTemplateId
 * @param {Object} updateBody
 * @returns {Promise<EmailTemplate>}
 */
const updateEmailTemplateById = async (emailTemplateId, updateBody) => {
  const emailTemplate = await getEmailTemplateById(emailTemplateId);
  if (!emailTemplate) {
    throw new ApiError(httpStatus.NOT_FOUND, "EmailTemplate not found");
  }
  Object.assign(emailTemplate, updateBody);
  await emailTemplate.save();
  return emailTemplate;
};

/**
 * Delete emailTemplate by id
 * @param {ObjectId} emailTemplateId
 * @returns {Promise<EmailTemplate>}
 */
const deleteEmailTemplateById = async (emailTemplateId) => {
  const emailTemplate = await getEmailTemplateById(emailTemplateId);
  await emailTemplate.destroy();
  return emailTemplate;
};

module.exports = {
  createEmailTemplate,
  queryEmailTemplates,
  getEmailTemplateById,
  updateEmailTemplateById,
  deleteEmailTemplateById,
  getEmailTemplateByAction,
};
