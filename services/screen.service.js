const db = require("../models");
const screen = db.screen;

const queryRoles = async () => {
    const code = await screen.findAll();
    return code;
};

module.exports = {
    queryRoles
};
