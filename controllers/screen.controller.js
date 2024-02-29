const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { screeneService, userService, tokenService } = require('../services');

const getShift = catchAsync(async (req, res) => {
    //   const filter = pick(req.query, ["search"]);
    const result = await screeneService.queryRoles();
    res.send(result);
});


module.exports = {

    getShift,
};