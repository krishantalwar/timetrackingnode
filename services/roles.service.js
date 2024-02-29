const db = require("../models");
const roles = db.roles;
const screen = db.screen;
const permissions = db.permissions;

const queryRoles = async () => {
    const code = await roles.findAll(
        {
            // primaryKey: "roleid",
            include: [{
                model: db.permissions,
                foreignKey: 'role_id',
                as: 'permissions',
                include: [{
                    model: db.screen,
                    foreignKey: {
                        name: 'screenid'
                    },
                    sourceKey: 'screen_id',
                    as: 'screens' // Use 'screens' here
                }]
            }]
            // include: [
            //     'screens_permissions',
            //     // 'permissions.screens'
            // ]
            // include: [
            //     {
            //         model: 'permissions',
            //         // model: 'screens',
            //         include: [
            //             'screens'
            //         ]
            //     }
            // ]
            // logging: function (str) {
            //     console.log(str)
            //     // do stuff with the sql str
            // }

        }
    );
    return code;
};

module.exports = {
    queryRoles
};
