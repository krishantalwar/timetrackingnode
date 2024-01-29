const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { emailTemplateService } = require('../services');

const createEmailTemplate = catchAsync(async (req, res) => {
    const emailTemplate = await emailTemplateService.createEmailTemplate(req.body);
    res.status(httpStatus.CREATED).send(emailTemplate);
});

const getEmailTemplates = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['search']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await emailTemplateService.queryEmailTemplates(filter, options);
    res.send(result);
});

const getEmailTemplate = catchAsync(async (req, res) => {
    const emailTemplate = await emailTemplateService.getEmailTemplateById(req.params.emailTemplateId);
    if (!emailTemplate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'EmailTemplate not found');
    }
    res.send(emailTemplate);
});

const updateEmailTemplate = catchAsync(async (req, res) => {
    const emailTemplate = await emailTemplateService.updateEmailTemplateById(req.params.emailTemplateId, req.body);
    res.send(emailTemplate);
});

const deleteEmailTemplate = catchAsync(async (req, res) => {
    await emailTemplateService.deleteEmailTemplateById(req.params.emailTemplateId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createEmailTemplate,
    getEmailTemplates,
    getEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
};