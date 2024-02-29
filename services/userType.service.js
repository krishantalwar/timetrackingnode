const db = require("../models");
const shiftMaster = db.shiftMaster;

const queryRoles = async () => {
    const code = await shiftMaster.count();
    return code;
};

module.exports = {
    queryRoles
};
