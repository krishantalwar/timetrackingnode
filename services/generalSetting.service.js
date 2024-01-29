const httpStatus = require('http-status');
const moment = require("moment");
const tokenService = require('./token.service');
// const bcryptPassword = require('../utils/bcrypt');
const ApiError = require('../utils/ApiError');
const { aggregatePaging } = require('./aggregatePaging.service');

const db = require("../models");
const { result } = require('lodash');
const GeneralSetting = db.globalSettings;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize

/**
 * Create a generalsetting
 * @param {Object} generalsettingBody
 * @returns {Promise<GeneralSetting>}
 */
const createGeneralSetting = async (generalsettingBody) => {
    const generalsetting = await GeneralSetting.create(generalsettingBody);
    return generalsetting;
};



/**
 * Get generalsetting by id
 * @param {ObjectId} id
 * @returns {Promise<GeneralSetting>}
 */
const getGeneralSettingById = async (id) => {
    return GeneralSetting.findByPk(id);
};

/**
 * Get generalsetting
 * @param {ObjectId} id
 * @returns {Promise<GeneralSetting>}
 */
const getGeneralSetting = async () => {
    return GeneralSetting.findOne();
};


/**
 * Update generalsetting by id
 * @param {ObjectId} generalsettingId
 * @param {Object} updateBody
 * @returns {Promise<GeneralSetting>}
 */
const updateGeneralSettingById = async (generalsettingId, updateBody) => {
    const generalsetting = await getGeneralSettingById(generalsettingId);
    if (!generalsetting) {
        throw new ApiError(httpStatus.NOT_FOUND, 'GeneralSetting not found');
    }
    Object.assign(generalsetting, updateBody);
    await generalsetting.save();
    return generalsetting;
};




/**
 * Create a generalsetting
 * @param {Object} generalsettingBody
 * @returns {Promise<GeneralSetting>}
 */
const createAndUpdateGeneralSetting = async (generalsettingBody) => {
    const checkGeneralSettingAvailable = await getGeneralSetting()
    let generalSetting = {}
    if (!!checkGeneralSettingAvailable) {
        generalSetting = updateGeneralSettingById(checkGeneralSettingAvailable.id, generalsettingBody)
    } else {
        generalSetting = await GeneralSetting.create(generalsettingBody);
    }
    return generalSetting;
};


module.exports = {
    createAndUpdateGeneralSetting,
    getGeneralSetting
};