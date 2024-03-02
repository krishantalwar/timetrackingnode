const db = require("../models");
const country = db.country;
const User = db.users;


const queryRoles = async () => {
    const countries = await country.findAll({
        include: 'country_state'
    });
    return countries;
};

const saveShift = async (body) => {

    const userDetail = await userDetail.findOne({
        where: { 'user_id': body.id },
    })

    const updateBody = {
        address: body.address ?? "",
        phone: body.phone ?? "",
        city: body.city ?? "",
        state: body.state ?? "",
        country: body.country ?? "",
    }

    Object.assign(userDetail, updateBody);
    await userDetail.save();



    const User = await User.findByPk(body.id);

    const userupdateBody = {
        first_name: body.first_name ?? "",
        last_name: body.last_name ?? "",
    }
    Object.assign(User, userupdateBody);
    await User.save();

    return User;
}
module.exports = {
    queryRoles,
    saveShift
};
