const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { designationService, userService, tokenService } = require('../services');

const saveShift = catchAsync(async (req, res) => {
  console.log(req.body);
  const shift = await designationService.saveShift(req.body);

  res.status(httpStatus.CREATED).send({ shift });
});

const getShift = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ["search"]);
  const result = await designationService.queryShift();
  res.send(result);
});

const getCode = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ["search"]);
  const result = await designationService.getCode();
  res.send(result);
});

const getDetailsById = catchAsync(async (req, res) => {
  // console.log(req);
  // console.log(req.params);
  // console.log(req.query);
  const result = await designationService.getDetailsById(req.params.id);
  res.send(result);
});

const editShift = catchAsync(async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);

  const shift = await designationService.editShift(req.body, req.params.id);
  res.send(shift);
});

module.exports = {
  saveShift,
  getShift,
  getDetailsById,
  getCode,
  editShift
};