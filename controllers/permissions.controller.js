const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { permissionsService, userService, tokenService } = require('../services');

const saveShift = catchAsync(async (req, res) => {
      console.log(req.body);
    const shift = await permissionsService.saveShift(req.body);

    res.status(httpStatus.CREATED).send({ shift});
});

const getShift = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ["search"]);
  const result = await permissionsService.queryShift();
  res.send(result);
});
module.exports = {
    saveShift,
    getShift
};