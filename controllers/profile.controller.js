const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { profileService, userService, tokenService } = require('../services');

const getShift = catchAsync(async (req, res) => {
    console.log(req.params)
    //   const filter = pick(req.query, ["search"]);
    const result = await profileService.queryRoles(req.params?.id);
    res.send(result);
});

const saveShift = catchAsync(async (req, res) => {

    await authService.saveShift(req.body)
    await res.send({ message: 'Your password successfully changed.' })
})


module.exports = {
    saveShift,
    getShift,
};