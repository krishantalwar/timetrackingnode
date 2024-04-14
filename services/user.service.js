const httpStatus = require("http-status");
const moment = require("moment");
const tokenService = require("./token.service");
// const bcryptPassword = require('../utils/bcrypt');
const ApiError = require("../utils/ApiError");
const { aggregatePaging } = require("./aggregatePaging.service");

const db = require("../models");
const User = db.users;
const Spot = db.spots;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;
const userDetail = db.userDetail;
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody, headers) => {
  // console.log(User);

  if (await User.isEmailTakenWithEmail(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken.");
  }

  // if (
  //   userBody?.user_info?.cpfNumber &&
  //   (await User.isCpfNumberTaken(userBody.user_info.cpfNumber))
  // ) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "CPF / CNPJ# already taken.");
  // }

  userBody.email = userBody.email.toLowerCase();
  // userBody = await bcryptPassword(userBody);
  let userdetailbody = {
    "user_code": userBody?.employe_code,
    "email": userBody?.email,
    "first_name": userBody?.first_name,
    "last_name": userBody?.last_name,
    "status":userBody?.status,
  }
  const user = await User.create(userdetailbody);
  console.log("asdasd", user)

  console.log("asdasd", user.userid)

  if (user) {
    let detailbody = {
      "shift_id": userBody?.shift_allocation,
      "role_id": userBody?.role_assigned,
      "reporting_manager_id": userBody?.reporting_manager,
      "user_id": user?.userid,
      "department_id": userBody?.department,
      "designation_id": userBody?.designation,
      "date_of_birth": userBody?.date_of_birth,
      "date_of_joining": userBody?.date_of_joining,
      "state": userBody?.state,
      "country": userBody?.country,
      "phone": userBody?.phone,
      "user_type": userBody?.user_type,
      "status":userBody?.status,
    }
    const userdetail = await userDetail.create(detailbody);
  }

  return user;
};

/**
 * Query for users
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const queryUsers = async (filter, options) => {
  // const limit =
  //   options.limit && parseInt(options.limit, 10) > 0
  //     ? parseInt(options.limit, 10)
  //     : 10;
  // const page =
  //   options.page && parseInt(options.page, 10) > 0
  //     ? parseInt(options.page, 10)
  //     : 1;
  // const offset = (page - 1) * limit;

  // let where = { user_type: { [Op.eq]: "qs_user" } };

  // if (filter.search) {
  //   where = {
  //     ...where,
  //     [Op.or]: [
  //       { "user_info.firstName": { [Op.iLike]: "%" + filter.search + "%" } },
  //       { "user_info.lastName": { [Op.iLike]: "%" + filter.search + "%" } },
  //       { email: { [Op.iLike]: "%" + filter.search + "%" } },
  //     ],
  //   };
  // }

  const totalResults = await User.count({
    // where,
  });

  const users = await User.findAll({
    // where,
    // include: [
    //   {
    //     model: Spot,
    //     as: "spots",
    //   },
    // ],
    // order: [["created_on", "DESC"]],
    // offset,
    // limit,
  });
  return users;
  // return aggregatePaging(totalResults, page, limit, users);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findByPk(id, {
    // include: [
    //   {
    //     model: Spot,
    //     as: "spots",
    //   },
    // ],
    attributes: {
      exclude: [
        // "password",
        // "resetlink",
        // "verification_code",
        // "email_notification",
        // "verification_status",
        // "referral_code",
        // "user_referral_code",
        // "username",
        // "user_type",
      ],
    },
  });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserDetailsById = async (id) => {
  return await User.findByPk(id, {
    // include: [
    //   {
    //     model: Spot,
    //     as: "spots",
    //   },
    // ],
    attributes: {
      exclude: [
        // "password",
        // "resetlink",
        // "verification_code",
        // "email_notification",
        // "verification_status",
        // "referral_code",
        // "user_referral_code",
        // "username",
        // "user_type",
      ],
    },
    //     raw: true,
    // nest: true
  });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const checkEmailExist = async (email, excludeUserId) => {
  console.log(email, excludeUserId);

  const user = await User.findOne({
    where: {
      [Op.and]: [{ email: email }, { userid: { [Op.ne]: excludeUserId } }],
    },
    raw: true,
  });

  console.log(user);
  return !!user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  // console.log(user)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (updateBody?.email && (await User.isEmailTaken(updateBody?.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  // if (
  //   updateBody?.user_info?.cpfNumber &&
  //   (await User.isCpfNumberTakenExcludeUserId(
  //     updateBody?.user_info?.cpfNumber,
  //     userId
  //   ))
  // ) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "CPF / CNPJ# already taken.");
  // }

  if (updateBody?.email) {
    updateBody.email = updateBody?.email?.toLowerCase();
  }
  // console.log(updateBody)
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.destroy();
  return user;
};

/**
 * Export Users
 * @returns {Promise<QueryResult>}
 */

const exportUsers = async () => {
  let users = await User.findAll({
    include: [
      {
        model: Spot,
        as: "spots",
      },
    ],
    where: {
      user_type: { [Op.eq]: "qs_user" },
    },
    attributes: ["email", "user_info", "created_on", "status"],
    order: [["created_on", "DESC"]],
    // raw: true,
  });

  console.log(users, "here");
  let arr = [];
  users.map((o, index) => {
    if (index == 0) {
      arr.push({
        "S.No.": "S.No.",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        created_on: "Registration Date",
        listing: "Listing",
        booking: "Booking",
        status: "Status",
      });
    }

    arr.push({
      "S.No.": index + 1,
      firstName: o.user_info?.firstName,
      lastName: o.user_info?.lastName,
      email: o.email,
      created_on: moment(o.created_on).format("DD/MM/YYYY"),
      listing: o.spots.length,
      booking: "0",
      status: o.status == 1 ? "Enable" : "Disable",
    });
  });

  // let result = [["email"]]
  const result = arr.map((o) => Object.keys(o).map((k) => o[k]));
  return result;
};

const countUsers = async (countType = "") => {
  let users;

  if (countType == "new") {
    users = await User.count({
      where: {
        user_type: { [Op.eq]: "qs_user" },
        created_on: {
          [Op.between]: [moment().utc().startOf("month"), moment()],
        },
      },
    });
  } else {
    users = await User.count({
      where: {
        user_type: { [Op.eq]: "qs_user" },
      },
    });
  }

  return users;
};

const fetchUserByEmail = async (email) => {
  const user = await User.findAll({
    where: {
      email: email,
    },
    raw: true,
    attributes: {
      exclude: [
        "password",
        "resetlink",
        "verification_code",
        "email_notification",
        "referral_code",
        "username",
        "user_type",
      ],
    },
  });

  return user;
};

const saveSocialUser = async (userBody) => {
  const user = await User.create(userBody);
  return user;
};

const updateSocialUser = async (userBody, userId) => {
  const user = await User.update(userBody, { where: { userid: userId } });
  return user;
};

const getUserByEmail = async (email) => {
  // console.log(email);
  return await User.findOne({
    where: { 'email': email },

    // include: [
    //   {
    //     model: Spot,
    //     // as: "user",
    //   },
    // ],
    attributes: {
      exclude: [
        // "password",
        // "resetlink",
        // "verification_code",
        // "email_notification",
        // "verification_status",
        // "referral_code",
        // "user_referral_code",
        // "username",
        // "user_type",
      ],
    },
  });

  //  return await User.findAll();
};

const getCode = async () => {
  const code = await User.count();
  return { code: "EM" + code };
};


module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  exportUsers,
  getUserDetailsById,
  countUsers,
  fetchUserByEmail,
  saveSocialUser,
  updateSocialUser,
  getUserByEmail,
  getCode
};
