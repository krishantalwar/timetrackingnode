const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { shiftMasterService, userService, tokenService } = require('../services');

const saveShift = catchAsync(async (req, res) => {
  // console.log(req.body);
  const shift = await shiftMasterService.saveShift(req.body);

  res.status(httpStatus.CREATED).send({ shift });
});

const getShift = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ["search"]);
  const result = await shiftMasterService.queryShift();
  res.send(result);
});

const getCode = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ["search"]);
  const result = await shiftMasterService.getCode();
  res.send(result);
});

const getDetailsById = catchAsync(async (req, res) => {
  // console.log(req);
  // console.log(req.params);
  // console.log(req.query);
  const result = await shiftMasterService.getDetailsById(req.params.id);
  res.send(result);
});

const editShift = catchAsync(async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  const shift = await shiftMasterService.editShift(req.body, req.params.id);
  res.send(shift);
  // res.send({ "sdasd": "asdas" });
});


const deletShift = catchAsync(async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);

  const shift = await shiftMasterService.deletShift(req.params.id);
  res.status(httpStatus.OK).send({ "success": "success" });
});



module.exports = {
  saveShift,
  getShift,
  getDetailsById,
  getCode,
  editShift,
  deletShift
};