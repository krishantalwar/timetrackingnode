const db = require("../models");
const Job = db.job;


const saveShift = async (userBody) => {
    console.log(userBody);
    const user = await Job.create(userBody);
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

    const totalResults = await Job.count();

    const shift = await Job.findAll(

    );
    return shift;
    //   return aggregatePaging(totalResults, page, limit, shift);
};


const getCode = async () => {
    const code = await Job.count();
    return { code: "JB" + code };
};

const getDetailsById = async (id) => {
    const shift = await Job.findByPk(id, {},);
    return shift;
};
const editShift = async (shiftBody, id) => {
    console.log(shiftBody)
    const shift = await Job.update(shiftBody, {
        where: {
            "shiftid": id
        }
    });
    console.log(shift);
    return shift;
};

const deletShift = async (id) => {
    const shift = await Job.destroy({
        where: {
            shiftid: id
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