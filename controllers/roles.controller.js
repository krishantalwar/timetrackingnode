const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { rolesService, userService, tokenService } = require('../services');

const getShift = catchAsync(async (req, res) => {
    //   const filter = pick(req.query, ["search"]);
    const result = await rolesService.queryRoles();
    // result[0]
    res.send(result);
});


module.exports = {

    getShift,
};