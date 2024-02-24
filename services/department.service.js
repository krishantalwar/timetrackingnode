const db = require("../models");
const Department = db.department;


const saveShift = async (userBody) => {
  const user = await Department.create(userBody);
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

  const totalResults = await Department.count();

  const shift = await Department.findAll(

  );
  return shift;
  //   return aggregatePaging(totalResults, page, limit, shift);
};



const getCode = async () => {
  const code = await Department.count();
  return "dep" + code;
};

const getDetailsById = async (id) => {
  const shift = await Department.findByPk(id, {},);
  return shift;
};
const editShift = async (shiftBody, id) => {
  console.log(shiftBody)
  const shift = await Department.update(shiftBody, {
    where: {
      "departmentid": id
    }
  });
  console.log(shift);
  return shift;
};


module.exports = {
  saveShift,
  queryShift,
  editShift,
  getCode,
  getDetailsById
};