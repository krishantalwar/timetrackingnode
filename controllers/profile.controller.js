
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, S3Bucket } = require('../services');


const getProfile = catchAsync(async (req, res) => {
    const user = await userService.getUserById(1);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // if (user.dataValues.user_info?.image?.key) {
    //     user.dataValues.user_info.image.url = await S3Bucket.getDownloadUrl(user.dataValues.user_info.image.key)
    // }


    res.send(user);
});


const updateProfile = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(1, req.body);
    res.send(user);
});

module.exports = {
    getProfile,
    updateProfile
};