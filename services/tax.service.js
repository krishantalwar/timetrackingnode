const db = require("../models");
const Tax = db.tax;


const saveShift = async (userBody) => {
  body = {
    // "Taxid": userBody.tax,
    "name": userBody.name,
    "tax_rate": userBody.tax_rate,
  }
  const user = await Tax.create(userBody);
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

  const totalResults = await Tax.count();

  const shift = await Tax.findAll(

  );
  return shift;
  //   return aggregatePaging(totalResults, page, limit, shift);
};


const getCode = async () => {
  const code = await Tax.count();
  // console.log("asdasdsad");
  // return "desi" + code;
  return { code: "Tax" + code };
};

const getDetailsById = async (id) => {
  const shift = await Tax.findByPk(id, {},);
  return shift;
};
const editShift = async (shiftBody, id) => {
  console.log(shiftBody)
  const shift = await Tax.update(shiftBody, {
    where: {
      "taxid": id
    }
  });
  console.log(shift);
  return shift;
};
const deletShift = async (id) => {
  const shift = await Tax.destroy({
    where: {
      "taxid": id
    }
  });
  console.log(shift)
  return shift;
};

module.exports = {
  saveShift,
  queryShift,
  editShift,
  getCode,
  getDetailsById,
  deletShift
};
