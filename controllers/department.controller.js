const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { departmentService, userService, tokenService } = require('../services');

const saveShift = catchAsync(async (req, res) => {
      console.log(req.body);
    const shift = await departmentService.saveShift(req.body);

    res.status(httpStatus.CREATED).send({ shift});
});

const getShift = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ["search"]);
  const result = await departmentService.queryShift();
  res.send(result);
});
module.exports = {
    saveShift,
    getShift
};