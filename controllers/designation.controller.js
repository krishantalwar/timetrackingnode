const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { designationService, userService, tokenService } = require('../services');

const saveShift = catchAsync(async (req, res) => {
      console.log(req.body);
    const shift = await designationService.saveShift(req.body);

    res.status(httpStatus.CREATED).send({ shift});
});

const getShift = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ["search"]);
  const result = await designationService.queryShift();
  res.send(result);
});
module.exports = {
    saveShift,
    getShift
};