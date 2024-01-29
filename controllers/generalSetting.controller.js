
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { generalSettingService } = require('../services');

const updateGeneralSetting = catchAsync(async (req, res) => {
    const generalSetting = await generalSettingService.createAndUpdateGeneralSetting(req.body)
    res.status(httpStatus.OK).send(generalSetting);
});

const getGeneralSetting = catchAsync(async (req, res) => {
    const generalsetting = await generalSettingService.getGeneralSetting();
    if (!generalsetting) {
        res.send({
            "address": "",
            "phone_number": "",
            "fax_number": "",
            "support_hours": "",
            "facebook_url": "",
            "instagram_url": "",
            "pinterest": "",
            "google_url": ""
        });
    }
    res.send(generalsetting);
});



module.exports = {

    updateGeneralSetting,
    getGeneralSetting

};