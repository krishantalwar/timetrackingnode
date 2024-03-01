const db = require("../models");
const roles = db.roles;
const User = db.users;
const permissions = db.permissions;

const queryRoles = async (id) => {
    const code = await User.findByPk(id,
        {
            // primaryKey: "roleid",
            // include: [{
            //     model: db.permissions,
            //     foreignKey: 'role_id',
            //     as: 'permissions',
            //     include: [{
            //         model: db.screen,
            //         foreignKey: {
            //             name: 'screenid'
            //         },
            //         sourceKey: 'screen_id',
            //         as: 'screens' // Use 'screens' here
            //     }]
            // }
            // ]
            include: [
                'userDetail',
                // 'user_permissions'
            ]
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

const saveShift = async (body) => {

    // await userService.updateUserById(body.userid, { password: new_password })
    await userService.updateUserById(body.id, body)
    return
}
module.exports = {
    queryRoles,
    saveShift
};
