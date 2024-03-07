const db = require("../models");
const userDetail = db.userDetail;
const User = db.users;


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
            // include: [
            //     'userDetail',
            //     // 'user_permissions'
            // ]

            // include: [{ all: true, nested: true }]
            include: [
                {
                    association: 'userDetail',
                    include: [

                        {
                            association: 'userRole',
                            include: [
                                {
                                    association: 'permissions',
                                    include: [

                                        {
                                            association: 'screens'
                                        },
                                    ]
                                },
                            ]


                        },
                        {
                            association: 'userType'
                        },


                    ]
                }
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

    const userDetails = await userDetail.findOne({
        where: { 'user_id': body.id },
    })

    console.log(userDetails)
    const updateBody = {
        address: body.address ?? "",
        phone: body.phone ?? "",
        city: body.city ?? "",
        state: body.state ?? "",
        country: body.country ?? "",
    }

    Object.assign(userDetails, updateBody);
    await userDetails.save();



    const Users = await User.findByPk(body.id);
    console.log(Users)
    const userupdateBody = {
        first_name: body.first_name ?? "",
        last_name: body.last_name ?? "",
    }
    Object.assign(Users, userupdateBody);
    await Users.save();

    return Users;
}
module.exports = {
    queryRoles,
    saveShift
};
