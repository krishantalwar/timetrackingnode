const db = require("../models");
const Permissions = db.permissions;


const saveShift = async (userBody) => {
  // const user = await Permissions.create(userBody);
  const deletge = await Permissions.destroy({
    where: {
      "role_id": userBody.role_id
    }
  });
  const record = userBody.screen_id.map(async (currenvalue) => {
    // return { "role_id": userBody.role_id, "screen_id": currenvalue }

    return [recordkj, created] = await Permissions.upsert(
      { "role_id": userBody.role_id, "screen_id": currenvalue }, // Record to upsert
      { returning: true }     // Return upserted record
    );
  }
  )

  // const [record, created] = await Permissions.upsert(
  //   userBody, // Record to upsert
  //   { returning: true }     // Return upserted record
  // );
  // console.log(record)
  // const [record, created] = await Permissions.bulkCreate(record);
  return record;
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

  const totalResults = await Permissions.count();

  const shift = await Permissions.findAll(

  );
  return shift;
  //   return aggregatePaging(totalResults, page, limit, shift);
};
module.exports = {
  saveShift,
  queryShift
};