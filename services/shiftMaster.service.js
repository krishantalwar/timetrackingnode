const db = require("../models");
const shiftMaster = db.shiftMaster;


const saveShift = async (userBody) => {
  const user = await shiftMaster.create(userBody);
  return user;
};

const queryShift = async (filter, options) => {
//   const limit =
//     options.limit && parseInt(options.limit, 10) > 0
    //   ? parseInt(options.limit, 10)
//       : 10;
//   const page =
//     options.page && parseInt(options.page, 10) > 0
    //   ? parseInt(options.page, 10)
//       : 1;
//   const offset = (page - 1) * limit;

//   let where = { user_type: { [Op.eq]: "qs_user" } };

//   if (filter.search) {
//     where = {
//       ...where,
//       [Op.or]: [
//         { "user_info.firstName": { [Op.iLike]: "%" + filter.search + "%" } },
//         { "user_info.lastName": { [Op.iLike]: "%" + filter.search + "%" } },
//         { email: { [Op.iLike]: "%" + filter.search + "%" } },
//       ],
//     };
//   }

  const totalResults = await shiftMaster.count();

  const shift = await shiftMaster.findAll(
    
    );
    return shift;
//   return aggregatePaging(totalResults, page, limit, shift);
};
module.exports = {
    saveShift,
    queryShift
};
