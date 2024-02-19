const db = require("../models");
const User = db.users;

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
};

const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message('password must contain at least 1 letter and 1 number');
    }
    return value;
};

const checkEmailInUse = async (value, helpers) => {

  let asd=  await User.isNmailTakenWith(value)
    console.log(asd)
    if (asd) {
        // return helpers.error('any.custom');
        // throw new Error('nope');
    }
    //   return helpers.error('any.custom');
        throw new Error('any.custom');
     return value;
}

module.exports = {
    objectId,
    password,
    checkEmailInUse
};