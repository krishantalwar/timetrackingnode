// const db = require("../models");
// const userDetail = db.userDetail;
// const User = db.users;


// const queryRoles = async (id) => {
//     const code = await User.findByPk(id,
//         {
//             // primaryKey: "roleid",
//             // include: [{
//             //     model: db.permissions,
//             //     foreignKey: 'role_id',
//             //     as: 'permissions',
//             //     include: [{
//             //         model: db.screen,
//             //         foreignKey: {
//             //             name: 'screenid'
//             //         },
//             //         sourceKey: 'screen_id',
//             //         as: 'screens' // Use 'screens' here
//             //     }]
//             // }
//             // ]
//             include: [
//                 'userDetail',
//                 // 'user_permissions'
//             ]
//             // include: [
//             //     {
//             //         model: 'permissions',
//             //         // model: 'screens',
//             //         include: [
//             //             'screens'
//             //         ]
//             //     }
//             // ]
//             // logging: function (str) {
//             //     console.log(str)
//             //     // do stuff with the sql str
//             // }

//         }
//     );
//     return code;
// };

// const saveShift = async (body) => {

//     const userDetail = await userDetail.findOne({
//         where: { 'user_id': body.id },
//     })

//     const updateBody = {
//         address: body.address ?? "",
//         phone: body.phone ?? "",
//         city: body.city ?? "",
//         state: body.state ?? "",
//         country: body.country ?? "",
//     }

//     Object.assign(userDetail, updateBody);
//     await userDetail.save();



//     const User = await User.findByPk(body.id);

//     const userupdateBody = {
//         first_name: body.first_name ?? "",
//         last_name: body.last_name ?? "",
//     }
//     Object.assign(User, userupdateBody);
//     await User.save();

//     return User;
// }
// module.exports = {
//     queryRoles,
//     saveShift
// };
