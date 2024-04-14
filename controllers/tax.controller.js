const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taxservice, userService, tokenService } = require('../services');

const saveShift = catchAsync(async (req, res) => {
  console.log(req.body);
  const shift = await taxservice.saveShift(req.body);

  res.status(httpStatus.CREATED).send({ shift });
});

const getShift = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ["search"]);
  const result = await taxservice.queryShift();
  res.send(result);
});

const getCode = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ["search"]);
  const result = await taxservice.getCode();
  res.send(result);
});

const getDetailsById = catchAsync(async (req, res) => {
  // console.log(req);
  // console.log(req.params);
  // console.log(req.query);
  const result = await taxservice.getDetailsById(req.params.id);
  res.send(result);
});

const editShift = catchAsync(async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);

  const shift = await taxservice.editShift(req.body, req.params.id);
  res.send(shift);
});
const deletShift = catchAsync(async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);

  const shift = await taxservice.deletShift(req.params.id);
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