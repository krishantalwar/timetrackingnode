const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { cmsPageService } = require("../services");

const createCmsPage = catchAsync(async (req, res) => {
  const cmsPage = await cmsPageService.createCmsPage(req.body);
  res.status(httpStatus.CREATED).send(cmsPage);
});

const getCmsPages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["search"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await cmsPageService.queryCmsPages(filter, options);
  res.send(result);
});

const getUserCmsPages = catchAsync(async (req, res) => {
  //const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await cmsPageService.queryUserCmsPages();
  res.send(result);
});

const getCmsPage = catchAsync(async (req, res) => {
  const cmsPage = await cmsPageService.getCmsPageById(req.params.cmsPageId);
  if (!cmsPage) {
    throw new ApiError(httpStatus.NOT_FOUND, "Page not found");
  }
  res.send(cmsPage);
});

const getCmsPageBySlug = catchAsync(async (req, res) => {
  const cmsPage = await cmsPageService.getCmsPageBySlug(req.params.slug);
  if (!cmsPage) {
    throw new ApiError(httpStatus.NOT_FOUND, "Page not found");
  }
  res.send(cmsPage);
});

const updateCmsPage = catchAsync(async (req, res) => {
  const cmsPage = await cmsPageService.updateCmsPageById(
    req.params.cmsPageId,
    req.body
  );
  res.send(cmsPage);
});

const deleteCmsPage = catchAsync(async (req, res) => {
  await cmsPageService.deleteCmsPageById(req.params.cmsPageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCmsPage,
  getCmsPages,
  getCmsPage,
  updateCmsPage,
  deleteCmsPage,
  getCmsPageBySlug,
  getUserCmsPages,
};
