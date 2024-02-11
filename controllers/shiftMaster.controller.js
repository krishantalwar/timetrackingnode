const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { shiftMasterService, userService, tokenService } = require('../services');

const saveShift = catchAsync(async (req, res) => {
    const shift = await shiftMasterService.saveShift(req.body);
    console.log(shift);
    res.status(httpStatus.CREATED).send({ shift});
});

const getShift = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ["search"]);
  const result = await shiftMasterService.queryShift();
  res.send(result);
});
module.exports = {
    saveShift,
    getShift
};