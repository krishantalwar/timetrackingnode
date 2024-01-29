const db = require("../db/db");
const { error_code, error_messages } = require("../utills/https_messages");
const { generateRandamPromoCode } = require("../utills/common");
const { schemaName, useridSeqNo, userType } = require("../constants");
const { reject } = require("lodash");
const { userService } = require("../services");

const fetchUserDataWithEmail = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      // const query = `SELECT * FROM ${schemaName}.qs_user  WHERE email = $1 AND user_type = '${userType.user}'`;
      const query = `SELECT * FROM ${schemaName}.qs_user  WHERE email = $1`;
      db.query(query, [email], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve({ data: res.rows });
        }
      });
    } catch (err) {
      console.log("err-fetchUserDataWithEmail", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchUserDataWithId = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_user  WHERE userid = $1 AND user_type = '${userType.user}'`;
      db.query(query, [id], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve({ data: res.rows });
        }
      });
    } catch (err) {
      console.log("err-fetchUserDataWithId", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchUserDataWithEmailAndPassword = async (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT qs_user.*,qs_wishlist.quickspot_id FROM ${schemaName}.qs_user left join ${schemaName}.qs_wishlist on qs_user.userid=qs_wishlist.userid WHERE email = $1 AND PASSWORD= $2 `;
      db.query(query, [email, password], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve({ data: res.rows });
        }
      });
    } catch (err) {
      console.log("err-fetchUserDataWithEmail", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const insertUserSingupData = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const promoCode = generateRandamPromoCode();
      console.log("promoCode", promoCode);
      // cons userId=
      const query = `INSERT into ${schemaName}.qs_user  (email, status,password,user_referral_code,referral_code, email_notification, user_type, created_on,userid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, nextval(pg_get_serial_sequence('spot.qs_user', 'userid'))) RETURNING userid;`;
      console.log(query);
      db.query(
        query,
        [
          data.email,
          1,
          data.password,
          promoCode,
          data.referral_code || null,
          data.email_notification || false,
          userType.user,
          new Date(),
        ],
        (error, res) => {
          if (error) {
            throw error;
          } else {
            resolve(res.rows[0]);
          }
        }
      );
    } catch (err) {
      console.log("err", JSON.stringify(err));
      Promise.reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const updateUserResetLinkData = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `UPDATE ${schemaName}.qs_user SET resetLink = $1, modified_on = $2 WHERE email = '${data.email}' RETURNING userid;`;
      console.log(query);
      db.query(
        query,
        [data.resetLink, new Date().toISOString()],
        (error, res) => {
          if (error) {
            throw error;
          } else {
            resolve(true);
          }
        }
      );
    } catch (err) {
      console.log("err", JSON.stringify(err));
      Promise.reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const updateUserData = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `UPDATE ${schemaName}.qs_user SET verification_code = $1, verification_status = $2, modified_on = $3, user_referral_code = $4 WHERE email = '${data.email}';`;
      console.log(query);
      db.query(
        query,
        [
          data.verification_code,
          data.verification_status,
          new Date().toISOString(),
          data.user_referral_code ? data.user_referral_code : 0,
        ],
        (error, res) => {
          if (error) {
            throw error;
          } else {
            resolve(true);
          }
        }
      );
    } catch (err) {
      console.log("err", JSON.stringify(err));
      Promise.reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const updateUserPassword = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `UPDATE ${schemaName}.qs_user SET password = $1, resetLink = $2, modified_on = $3 WHERE email = '${data.email}';`;
      console.log(query);
      db.query(
        query,
        [data.password, data.key, new Date().toISOString()],
        (error, res) => {
          if (error) {
            throw error;
          } else {
            resolve(true);
          }
        }
      );
    } catch (err) {
      console.log("err", JSON.stringify(err));
      Promise.reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};
const changeUserPassword = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `UPDATE ${schemaName}.qs_user SET password = $1, modified_on = $2 WHERE userid = '${data.id}';`;
      console.log(query);
      db.query(
        query,
        [data.password, new Date().toISOString()],
        (error, res) => {
          if (error) {
            throw error;
          } else {
            resolve(true);
          }
        }
      );
    } catch (err) {
      console.log("err", JSON.stringify(err));
      Promise.reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const updateVerificationCode = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `UPDATE ${schemaName}.qs_user SET  verification_code = $1, verification_status = $2 WHERE userid = $3;`;
      db.query(
        query,
        [data.verification_code, data.verification_status || false, data.id],
        (error, res) => {
          if (error) {
            throw error;
          } else {
            resolve(true);
          }
        }
      );
    } catch (err) {}
  });
};

// const insertCompleteUserData = async (data, userid, verificationData) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const query = `UPDATE ${schemaName}.qs_user SET user_info = $1, verification_code = $2, verification_status = $3  WHERE userid = '${userid}' RETURNING userid;`;
//       db.query(
//         query,
//         [
//           data,
//           verificationData.verification_code,
//           verificationData.verification_status,
//         ],
//         (error, res) => {
//           if (error) {
//             throw error;
//           } else {
//             resolve(res.rows[0]);
//           }
//         }
//       );
//     } catch (err) {
//       Promise.reject({
//         code: error_code.serverSideError,
//         message: error_messages.db_issue,
//         err,
//       });
//     }
//   });
// };

const insertCompleteUserData = async (data, userid, verificationData) => {
  const user = await userService.updateUserById(userid, {
    user_info: data.user_info,
    verification_code: verificationData.verification_code,
    verification_status: verificationData.verification_status,
  });
  return user;
};

const getUserInfo = async (userid) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT user_info,social_info,email,user_referral_code,quickspot_id FROM ${schemaName}.qs_user left join ${schemaName}.qs_wishlist on qs_user.userid=qs_wishlist.userid WHERE qs_user.userid = '${userid}';`;
      db.query(query, (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows[0]);
        }
      });
    } catch (err) {
      Promise.reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const checkReferralCodeExist = async (referralCode) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_user WHERE user_referral_code = $1`;
      console.log("query  ", query);
      db.query(query, [referralCode], (error, res) => {
        if (error) {
          throw error;
        } else {
          let flag = false;
          if (res?.rows > 0) {
            flag = true;
          }
          resolve(flag);
        }
      });
    } catch (err) {
      console.log("err-checkReferralCodeExist", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

// const updateProfile = async (data, id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       let queryData = [
//         new Date().toISOString(),
//         "qs_user",
//       ];

//       const query = `UPDATE ${schemaName}.qs_user SET user_info  = user_info || '{"firstName": "${data.first_name}", "lastName":"${data.last_name}","countryCode":"${data.country_code}","phone_number":"${data.mobile}","companyName":"${data.company_name}","image":"${data.picture}"}' , modified_on = $1, modified_by = $2 WHERE userid = '${id}' RETURNING userid;`;
//       db.query(query, queryData, (error, res) => {
//         if (error) {
//           throw error;
//         } else {
//           resolve(true);
//         }
//       });
//     } catch (err) {
//       console.log("err-updateProfile", JSON.stringify(err));
//       reject({
//         status: error_code.serverSideError,
//         message: error_messages.db_issue,
//         err,
//       });
//     }
//   });
// };

const updateProfile = async (data, id) => {
  const user = await userService.updateUserById(id, {
    user_info: data.user_info,
  });

  return user;
  // return new Promise((resolve, reject) => {
  //   try {
  //     let queryData = [
  //       new Date().toISOString(),
  //       "qs_user",
  //     ];

  //     const query = `UPDATE ${schemaName}.qs_user SET user_info  = user_info || '{"firstName": "${data.first_name}", "lastName":"${data.last_name}","countryCode":"${data.country_code}","phone_number":"${data.mobile}","companyName":"${data.company_name}","image":"${data.picture}"}' , modified_on = $1, modified_by = $2 WHERE userid = '${id}' RETURNING userid;`;
  //     db.query(query, queryData, (error, res) => {
  //       if (error) {
  //         throw error;
  //       } else {
  //         resolve(true);
  //       }
  //     });
  //   } catch (err) {
  //     console.log("err-updateProfile", JSON.stringify(err));
  //     reject({
  //       status: error_code.serverSideError,
  //       message: error_messages.db_issue,
  //       err,
  //     });
  //   }
  // });
};

const countUsersMonthly = async (fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT
      to_char(DATE_TRUNC('month',created_on),'Mon')
        AS  month_name,
      COUNT(userid) AS count
FROM ${schemaName}.qs_user where user_type=$1 and date(created_on) between $2 and $3
GROUP BY DATE_TRUNC('month',created_on) order by min(created_on);`;
      db.query(query, ['qs_user',fromDate, toDate], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows);
        }
      });
    } catch (err) {
      console.log("err-countUsersMonthly", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const totalUsersBeforeDate = async (fromDate) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT
      count(userid) AS total
FROM ${schemaName}.qs_user where user_type=$1 and created_on < $2`;
      db.query(query, ['qs_user',fromDate], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows[0]);
        }
      });
    } catch (err) {
      console.log("err-totalUsersBeforeDate", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

module.exports = {
  fetchUserDataWithEmail,
  insertUserSingupData,
  fetchUserDataWithEmailAndPassword,
  updateUserResetLinkData,
  updateUserData,
  updateUserPassword,
  fetchUserDataWithId,
  changeUserPassword,
  insertCompleteUserData,
  updateVerificationCode,
  getUserInfo,
  updateProfile,
  checkReferralCodeExist,
  countUsersMonthly,
  totalUsersBeforeDate,
};
