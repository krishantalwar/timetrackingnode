const {
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
} = require("../queries/user_queries");

const { fetchWishList } = require("../queries/myspots_queries");

const { userSignupSchema, userLoginSchema } = require("../utills/vallidation");

const {
  error_code,
  error_messages,
  success_messages,
} = require("../utills/https_messages");

const {
  user_success_messages,
  user_error_messages,
} = require("../utills/messages/user_messages");

const {
  generateJwtToken,
  generateJwtTokenForResetPassword,
} = require("../utills/jwtToken");

const { mailerTransporter } = require("../utills/mailer_transporter");

const {
  generateRandamOTPCode,
  generateRandamKeyCode,
  generateRandamPromoCode,
} = require("../utills/common");

const lo = require("lodash");
const {
  emailTemplateService,
  handleBarService,
  userService,
} = require("../services");

const db = require("../models");
const User = db.users;

const loginCtrl = async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (!lo.isEmpty(error)) {
      res.statusCode(error_code.invalidPayload).json({ error: error });
    }
    let { data: user } = await fetchUserDataWithEmailAndPassword(
      req.body.email,
      req.body.password
    );
    if (lo.isEmpty(user)) {
      return res.status(error_code.badRequest).send({
        message: error_messages.email_or_password_Wrong,
        status: error_code.badRequest,
      });
    }

    //check user status here is disabled.
    if (user[0].status == 0) {
      return res.status(error_code.badRequest).send({
        message: error_messages.user_status_diasbled_message,
        status: error_code.badRequest,
      });
    }
    const jwtToken = await generateJwtToken(req.body.email);
    const data = user[0];
    const userData = {
      userid: data.userid,
      username: data.username,
      email: data.email,
      user_info: data.user_info,
      user_referral_code: data.user_referral_code,
      verification_status: data.verification_status,
      wishlist: data.quickspot_id,
    };
    if (data.verification_status) {
      res.status(error_code.success).json({
        message: success_messages.login_success,
        token: jwtToken,
        data: userData,
        status: error_code.success,
      });
    } else {
      res.status(error_code.success).json({
        message: success_messages.login_success,
        data: userData,
        status: error_code.success,
      });
    }
  } catch (err) {
    console.log("Error", err);
    res.send(err);
  }
};

const signupCtrl = async (req, res, next) => {
  try {
    const { error } = userSignupSchema.validate(req.body);
    if (!lo.isEmpty(error)) {
      return res
        .status(error_code.badRequest)
        .send({ message: error, status: error_code.badRequest });
    }
    req.body.email = req.body.email.toLowerCase();
    let { data: isUserDataExist } = await fetchUserDataWithEmail(
      req.body.email
    );

    if (!lo.isEmpty(isUserDataExist)) {
      return res.status(error_code.badRequest).send({
        message: error_messages.email_exist,
        status: error_code.badRequest,
      });
    }
    const data = await insertUserSingupData(req.body);
    res.status(error_code.success).send({
      message: "Signup successfully completed",
      status: error_code.success,
      userid: data.userid,
    });
  } catch (err) {
    console.log("err", err);
    res.send(err);
  }
};

const checkReferralCodeDuplicate = async () => {
  let referralCode = "QS" + generateRandamPromoCode();
  let checkReferralCode = await checkReferralCodeExist(referralCode);

  if (checkReferralCode) {
    let result = await checkReferralCodeDuplicate();
  } else {
    return referralCode;
  }
};

const verifyUserCtrl = async (req, res, next) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.statusCode(error_code.badRequest).json({
        message: user_error_messages.verification_code_required,
        status: error_code.badRequest,
      });
    }
    let { data: user } = await fetchUserDataWithEmail(req.body.email);
    if (user[0].verification_code == code) {
      let referralCode = await checkReferralCodeDuplicate();

      const obj = {
        verification_code: null,
        verification_status: true,
        user_referral_code: referralCode,
        email: req.body.email,
      };

      const emailTemplate = await emailTemplateService.getEmailTemplateByAction(
        "VERIFICATION_SUCCESSFUL"
      );

      const result = await updateUserData(obj).then(
        async (data) => {
          if (!!emailTemplate) {
            var data = {
              first_name: user[0].user_info.firstName,
              last_name: user[0].user_info.lastName,
              link: `${process.env.FRONTEND_BASE_URL}/signup?key=${referralCode}`,
            };

            const plainHtml = await handleBarService.getPlainHtml(
              emailTemplate.email_body,
              data
            );

            let info = {
              from: `<${process.env.APP_EMAIL_ADDRESS}>`, // sender address
              to: `${obj.email}`, // list of receivers
              subject: emailTemplate.email_subject, // Subject line
              html: plainHtml, // html body
            };
            mailerTransporter().sendMail(info, (error, body) => {
              if (error) {
                return res.status(error_code.badRequest).send({
                  message: error.message,
                  status: error_code.badRequest,
                });
              }
            });
          }
        },
        (err) => {
          return res.status(error_code.serverSideError).send({ error: err });
        }
      );

      const jwtToken = await generateJwtToken(req.body.email);
      res.status(error_code.success).send({
        message: user_success_messages.user_verified,
        token: jwtToken,
        user_referral_code: obj.user_referral_code,
        status: error_code.success,
      });
    } else {
      res.status(error_code.badRequest).send({
        message: user_error_messages.invalid_code,
        status: error_code.badRequest,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const forgotPasswordCtrl = async (req, res, next) => {
  try {
    const email = req.body.email;
    let { data: isUserDataExist } = await fetchUserDataWithEmail(
      req.body.email
    );
    if (lo.isEmpty(isUserDataExist)) {
      return res.status(error_code.badRequest).send({
        message: error_messages.user_not_found,
        status: error_code.badRequest,
      });
    }
    const key = generateRandamKeyCode();

    const emailTemplate = await emailTemplateService.getEmailTemplateByAction(
      "FORGOT_PASSWORD"
    );
    var data = {
      link: `${process.env.FRONTEND_BASE_URL}/reset-password?key=${key}&email=${email}`,
    };

    const plainHtml = await handleBarService.getPlainHtml(
      emailTemplate.email_body,
      data
    );

    let info = {
      from: "<cgt.pawan.test@gmail.com>", // sender address
      to: `${email}`, // list of receivers
      subject: emailTemplate.email_subject, // Subject line
      // text: "Hello world?", // plain text body
      html: `${plainHtml}`, // html body
    };

    updateUserResetLinkData({ resetLink: key, email: email }).then(
      (data) => {
        mailerTransporter().sendMail(info, (error, body) => {
          if (error) {
            return res
              .status(error_code.badRequest)
              .send({ message: error.message, status: error_code.badRequest });
          }
          if (body) {
            // console.log(body)
            res.status(error_code.success).send({
              message: user_success_messages.reset_password_link_sent,
              status: error_code.success,
            });
          }
        });
      },
      (err) => {
        return res.status(error_code.serverSideError).send({ error: err });
      }
    );
  } catch (err) {
    res.send(err);
  }
};

// const verifyUserPasswordCtrl = async (req, res, next) => {
//     try {
//         if (req.body.email && req.body.key) {
//             req.body.email = req.body.email.toLowerCase();
//             let { data: isUserDataExist } = await fetchUserDataWithEmail(req.body.email);

//             if (lo.isEmpty(isUserDataExist)) {
//                 return res.status(error_code.badRequest).send({ message: error_messages.user_not_found, status: error_code.badRequest });
//             }
//             if (isUserDataExist[0].resetlink !== req.body.key) {
//                 return res.status(error_code.success).send({ message: user_error_messages.verification_failed, status: error_code.badRequest })
//             } else {
//                 res.status(error_code.success).send({ message: user_success_messages.verification_success, status:error_code.success })
//             }
//         } else {
//             return res.status(error_code.badRequest).send({ message: error_messages.invalid_data, status:error_code.badRequest })
//         }
//     } catch (err) {
//         console.log('err', err);
//         res.send(err)
//     }
// }

const updatePasswordCtrl = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(error_code.badRequest).send({
        message: "Password is required",
        status: error_code.badRequest,
      });
    }
    if (!(req.body.email && req.body.key)) {
      return res.status(error_code.badRequest).send({
        message: error_messages.invalid_data,
        status: error_code.badRequest,
      });
    }
    let { data: userData } = await fetchUserDataWithEmail(req.body.email);
    // const lastmodifyTime = userData[0].modified_on;
    // const currentDate = new Date().toISOString().toString();
    // console.log(lastmodifyTime,'-----',currentDate);
    // const diff = (new Date(currentDate) - new Date(lastmodifyTime))/(1000*60);
    // console.log(diff);
    // if(diff>15){
    //     return res.status(error_code.badRequest).send({ message: "Link expired please sent new link to change your password", status: error_code.badRequest })
    // }
    if (userData[0].resetlink !== req.body.key) {
      return res.status(error_code.badRequest).send({
        message: user_error_messages.verification_failed,
        status: error_code.badRequest,
      });
    }
    const obj = {
      key: null,
      password: req.body.password,
      email: req.body.email,
    };
    await updateUserPassword(obj);
    res.status(error_code.success).send({
      message: user_success_messages.password_reset,
      status: error_code.success,
    });

    // req.send({message: ""})
  } catch (err) {
    res.send(err);
  }
};

const changePasswordCtrl = async (req, res, next) => {
  const userData = req.userData;
  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword)) {
    return res.status(error_code.badRequest).send({
      message: error_messages.invalid_data,
      status: error_code.badRequest,
    });
  }

  if (userData.password !== oldPassword) {
    return res
      .status(error_code.badRequest)
      .send({ message: "Old password is incorrect" });
  }

  if (userData.password == newPassword) {
    return res
      .status(error_code.badRequest)
      .send({ message: "Current password and New Password can't be same." });
  }

  console.log(userData);
  const obj = {
    password: newPassword,
    id: userData.userid,
  };
  await changeUserPassword(obj);
  res.status(error_code.success).send({
    message: user_success_messages.password_updated_success,
    status: error_code.success,
  });
};

const resentOTPCtrl = async (req, res, next) => {
  const userId = req.params.id;
  const OTP = generateRandamOTPCode();

  const emailTemplate = await emailTemplateService.getEmailTemplateByAction(
    "REGISTRATION_VERIFICATION"
  );
  if (!!emailTemplate) {
    var data = {
      OTP: OTP,
    };
    const plainHtml = await handleBarService.getPlainHtml(
      emailTemplate.email_body,
      data
    );

    // send mail with defined transport object
    let info = {
      from: `<${process.env.APP_EMAIL_ADDRESS}>`, // sender address
      to: `${req.body.email}`, // list of receivers
      subject: emailTemplate.email_subject, // Subject line
      html: plainHtml, // html body
    };
    mailerTransporter().sendMail(info, (error, data) => {
      if (error) {
        return res
          .status(error_code.badRequest)
          .send({ message: error.message, status: error_code.badRequest });
      }
      if (data) {
        res.status(error_code.success).send({
          message: user_success_messages.verification_email_sent_success,
          status: error_code.success,
        });
        const obj = {
          verification_code: OTP,
          verification_status: false,
          id: userId,
        };
        updateVerificationCode(obj);
        // insertUserSingupData(obj).then(() => {
        //     // res.send({ message: success_messages.signup_success });
        // })
      }
    });
  } else {
    res.status(error_code.success).send({
      message: user_success_messages.verification_email_sent_success,
      status: error_code.success,
    });
  }
};

const completeProfileCtrl = async (req, res, next) => {
  const userId = req.params.id;
  const body = req.body;
  if (req && req.file && req.file.path) body["image"] = req.file.path;
  const OTP = generateRandamOTPCode();
  const user = await fetchUserDataWithId(userId);

  if (
    body?.user_info?.cpfNumber &&
    (await User.isCpfNumberTakenExcludeUserId(
      body.user_info.cpfNumber,
      userId
    ))
  ) {
    return res.status(error_code.badRequest).send({
      message: "CPF / CNPJ# already taken.",
      status: error_code.badRequest,
    });
  }

  const verificationData = {
    verification_code: OTP,
    verification_status: false,
  };
  
  const result = await insertCompleteUserData(
    body,
    userId,
    verificationData
  );

  if(user.data[0].social_info?.id){
    let referralCode = await checkReferralCodeDuplicate();

    const obj = {
      verification_code: null,
      verification_status: true,
      user_referral_code: referralCode,
      email: user.data[0].email,
    };

    const result = await updateUserData(obj);
    const jwtToken = await generateJwtToken(user.data[0].email);

    res.status(error_code.success).send({
      message: user_success_messages.profile_updated,
      status: error_code.success,
      is_social:true,
      token: jwtToken,
    });

  }else{
    const emailTemplate = await emailTemplateService.getEmailTemplateByAction(
      "REGISTRATION_VERIFICATION"
    );

    if (!!emailTemplate) {
      var data = {
        OTP: OTP,
      };
      const plainHtml = await handleBarService.getPlainHtml(
        emailTemplate.email_body,
        data
      );

      // send mail with defined transport object
      let info = {
        from: `<${process.env.APP_EMAIL_ADDRESS}>`, // sender address
        to: `${user.data[0].email}`, // list of receivers
        subject: emailTemplate.email_subject, // Subject line
        html: plainHtml, // html body
      };

      mailerTransporter().sendMail(info, async (error, data) => {
        if (error) {
          return res
            .status(error_code.badRequest)
            .send({ message: error.message, status: error_code.badRequest });
        }
        if (data) {
          
          res.status(error_code.success).send({
            message: user_success_messages.verification_email_sent_success,
            status: error_code.success,
          });
        }
      });
    } else {
      res.status(error_code.success).send({
        message: user_success_messages.verification_email_sent_success,
        status: error_code.success,
      });
    }
  }

};

const getCompleteProfileDataCtrl = async (req, res, next) => {
  const userId = req.params.id;
  if (userId) {
    const data = await getUserInfo(userId);
    let userData;
    if (data?.user_info) {
      // data.user_info.dateOfBirth = data.user_info.dateOfBirth
      //   ? data.user_info.dateOfBirth
      //   : "";
      // data.user_info.companyName = data.user_info.companyName
      //   ? data.user_info.companyName
      //   : "";
      // data.user_info.knowSource = data.user_info.knowSource
      //   ? data.user_info.knowSource
      //   : "";
      userData = { user_info: data.user_info,social_info:data.social_info };
      userData.email = data.email;
      (userData.user_referral_code = data?.user_referral_code),
        (userData.wishlist = data.quickspot_id);
    }
    res
      .status(error_code.success)
      .send({ data: userData, status: error_code.success });
  } else {
    res.status(error_code.badRequest).send({
      message: "Error while getting user data",
      status: error_code.badRequest,
    });
  }
};

const updateUserProfileCtrl = async (req, res, next) => {
  try {
    let userId = req?.userData?.userid;
    if (userId) {
      let resUpdate = await updateProfile(req.body, userId);
      if (resUpdate) {
        res.status(error_code.success).send({
          message: user_success_messages.profile_updated,
          status: error_code.success,
        });
      }
    } else {
      res.status(error_code.unauthorized).send({
        message: "Invalid User",
        status: error_code.unauthorized,
      });
    }
  } catch (err) {
    console.log("Error", err);
    res.send(err);
  }
};

const socialLoginCtrl = async (req, res, next) => {
  try {
    let reqUserData = req?.body?.user;
    let reqUserDataProvider = req?.body?.provider;
    let userSocialEmail = reqUserData?.email;

    if (!reqUserData) {
      return res.status(error_code.serverSideError).send({
        message: "Invalid Data",
        status: error_code.serverSideError,
      });
    }

    if (!userSocialEmail) {
      return res.status(error_code.serverSideError).send({
        message: "Email not found",
        status: error_code.serverSideError,
      });
    }

    let userBody;
    let saveUser;

    let userData = await userService.fetchUserByEmail(userSocialEmail);

    if (reqUserDataProvider == "google") {
      userBody = {
        email: userSocialEmail,
        user_info: userData[0]?.user_info || {},
        status: 1,
        user_type: "qs_user",
        social_info: {
          id: reqUserData?.sub,
          provider: reqUserDataProvider,
        },
      };

      userBody.user_info.image = {
        key: reqUserData?.picture,
        url: reqUserData?.picture,
      };
      userBody.user_info.lastName = reqUserData?.family_name;
      userBody.user_info.firstName = reqUserData?.given_name;
    }

    if (reqUserDataProvider == "facebook") {
      userBody = {
        email: userSocialEmail,
        user_info: userData[0]?.user_info || {},
        status: 1,
        user_type: "qs_user",
        social_info: {
          id: reqUserData?.id,
          provider: reqUserDataProvider,
        },
      };

      userBody.user_info.image = {
        key: reqUserData?.profilePicURL,
        url: reqUserData?.profilePicURL,
      };
      userBody.user_info.lastName = reqUserData?.lastName;
      userBody.user_info.firstName = reqUserData?.firstName;
    }

    if (!userData.length) {
      saveUser = await userService.saveSocialUser(userBody);
      userData = [saveUser?.dataValues];
    } else {
      if (
        userData[0]?.social_info?.provider != userBody?.social_info?.provider
      ) {
        saveUser = await userService.updateSocialUser(
          userBody,
          userData[0]?.userid
        );
      }
      userData = await userService.fetchUserByEmail(userSocialEmail);
    }

    let zeroIndexUser = userData[0];

    if (zeroIndexUser.status == 0) {
      return res.status(error_code.badRequest).send({
        message: error_messages.user_status_diasbled_message,
        status: error_code.badRequest,
      });
    }
    const jwtToken = await generateJwtToken(userSocialEmail);
    const wishListData = await fetchWishList(zeroIndexUser?.userid);
    zeroIndexUser.wishlist = wishListData.wishlist;

    if (zeroIndexUser.verification_status) {
      res.status(error_code.success).json({
        message: success_messages.login_success,
        token: jwtToken,
        data: zeroIndexUser,
        status: error_code.success,
      });
    } else {
      res.status(error_code.success).json({
        message: success_messages.login_success,
        data: zeroIndexUser,
        status: error_code.success,
      });
    }
  } catch (err) {
    console.log("Error", err);
    res.send(err);
  }
};

module.exports = {
  loginCtrl,
  signupCtrl,
  forgotPasswordCtrl,
  // verifyUserPasswordCtrl,
  verifyUserCtrl,
  updatePasswordCtrl,
  changePasswordCtrl,
  completeProfileCtrl,
  resentOTPCtrl,
  getCompleteProfileDataCtrl,
  updateUserProfileCtrl,
  socialLoginCtrl,
};
