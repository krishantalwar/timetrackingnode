const {
  fetchAdminDataWithEmailAndPassword,
  fetchAdminDataWithEmail,
  fetchAdminDataWithId,
} = require("../queries/admin_queries");

const {
  updateUserResetLinkData,
  changeUserPassword,
  updateUserPassword,
  countUsersMonthly,
  totalUsersBeforeDate,
} = require("../queries/user_queries");

const {
  countBookingMonthly,
  countBooking,
  countPayments,
} = require("../queries/booking_queries");

const {
  error_code,
  error_messages,
  success_messages,
} = require("../utills/https_messages");

const { mailerTransporter } = require("../utills/mailer_transporter");

const { userLoginSchema } = require("../utills/vallidation");

const { generateJwtToken } = require("../utills/jwtToken");

const Handlebars = require("handlebars");

const moment = require("moment");

const {
  user_success_messages,
  user_error_messages,
} = require("../utills/messages/user_messages");

const lo = require("lodash");

const { generateRandamKeyCode } = require("../utills/common");
const {
  emailTemplateService,
  handleBarService,
  userService,
  spotService,
} = require("../services");

const adminLoginCtrl = async (req, res, next) => {
  try {
    // const { error } = userLoginSchema.validate(req.body);
    // if (!lo.isEmpty(error)) {
    //   res.statusCode(error_code.invalidPayload).json({ error: error });
    // }
    let { data: user } = await fetchAdminDataWithEmailAndPassword(
      req.body.email,
      req.body.password
    );
    if (lo.isEmpty(user)) {
      return res.status(error_code.badRequest).send({
        message: error_messages.email_or_password_Wrong,
        status: error_code.badRequest,
      });
    }
    const jwtToken = await generateJwtToken(req.body.email);
    const data = user[0];
    const userData = {
      userid: data.userid,
      username: data.username,
      email: data.email,
      user_referral_code: data.user_referral_code,
      verification_status: data.verification_status,
      user_info: data.user_info,
    };
    res.status(error_code.success).send({
      message: success_messages.login_success,
      token: jwtToken,
      data: userData,
      status: error_code.success,
    });
  } catch (err) {
    console.log("Error", err);
    res.send(err);
  }
};

const adminForgotPasswordCtrl = async (req, res, next) => {
  try {
    const email = req.body.email;
    let { data: isUserDataExist } = await fetchAdminDataWithEmail(
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

    updateUserResetLinkData({ resetLink: key, email: email }).then(
      async (data) => {
        if (!!emailTemplate) {
          var data = {
            link: `${process.env.ADMIN_BASE_URL}/reset-password?key=${key}&email=${email}`,
          };

          const plainHtml = await handleBarService.getPlainHtml(
            emailTemplate?.email_body,
            data
          );

          // create reusable transporter object using the default SMTP transport
          // let transporter = nodemailer.createTransport({
          //     host: "smtp.gmail.com",
          //     port: 465,
          //     secure: true, // true for 465, false for other ports
          //     auth: {
          //         user: 'cgt.pawan.test@gmail.com', // generated ethereal user
          //         pass: 'hgkoqxokxdxpiozm', // generated ethereal password
          //     },
          // });
          // send mail with defined transport object
          let info = {
            from: "<cgt.pawan.test@gmail.com>", // sender address
            to: `${email}`, // list of receivers
            subject: emailTemplate?.email_subject, // Subject line
            // text: "Hello world?", // plain text body
            html: `${plainHtml}`, // html body
          };
          mailerTransporter().sendMail(info, (error, body) => {
            if (error) {
              return res.status(error_code.badRequest).send({
                message: error.message,
                status: error_code.badRequest,
              });
            }
            if (body) {
              console.log(body);
              console.log("code aaya yha tak");
              res.status(error_code.success).send({
                message: user_success_messages.reset_password_link_sent,
                status: error_code.success,
              });
            }
          });
        } else {
          res.status(error_code.success).send({
            message: user_success_messages.reset_password_link_sent,
            status: error_code.success,
          });
        }
      },
      (err) => {
        return res.status(error_code.serverSideError).send({ error: err });
      }
    );
  } catch (err) {
    res.send(err);
  }
};

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
    let { data: userData } = await fetchAdminDataWithEmail(req.body.email);
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
  //const { data: userData } = await fetchAdminDataWithId(userId);

  console.log(userData);
  if (lo.isEmpty(userData)) {
    return res.status(error_code.badRequest).send({
      message: error_messages.user_not_found,
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

const dashboardCtrl = async (req, res, next) => {
  const userData = req.userData;

  if (lo.isEmpty(userData)) {
    return res.status(error_code.badRequest).send({
      message: error_messages.user_not_found,
      status: error_code.badRequest,
    });
  }

  let total_users = await userService.countUsers();
  let new_users = await userService.countUsers("new");

  let total_spots = await spotService.countSpots();
  let new_spots = await spotService.countSpots("new");

  let total_bookings = await countBooking();

  let total_payment = await countPayments();

  let dashboardData = {
    new_users: new_users,
    total_users: total_users,
    total_spots: total_spots,
    new_spots: new_spots,
    total_bookings: parseInt(total_bookings.count),
    total_payment: parseInt(total_payment.count),
  };

  res.status(error_code.success).send({
    data: dashboardData,
    status: error_code.success,
  });
};

const getChartCtrl = async (req, res, next) => {
  const userData = req.userData;

  let { monthCount, type } = req.query;

  if (lo.isEmpty(userData)) {
    return res.status(error_code.badRequest).send({
      message: error_messages.user_not_found,
      status: error_code.badRequest,
    });
  }

  if (!monthCount) {
    return res.status(error_code.badRequest).send({
      message: error_messages.month_empty,
      status: error_code.badRequest,
    });
  }

  if (!type) {
    return res.status(error_code.badRequest).send({
      message: error_messages.chart_type_mandatory,
      status: error_code.badRequest,
    });
  }

  let labels = [];
  let labelCounts = [];
  let months = [];
  let data;
  let finalData = [];

  let currentDate = moment().format("YYYY-MM-DD");
  let fromDate = moment(currentDate)
    .subtract(monthCount, "M")
    .format("YYYY-MM-DD");

  let currentMonth = moment().format("MM");

  for (let i = currentMonth; i > currentMonth - monthCount; i--) {
    let calcMonth;
    if (i > 0) {
      calcMonth = i;
    } else {
      calcMonth = 12 + i;
    }
    finalData.push(moment(calcMonth, "M").format("MMM"));
  }

  if (type == "user") {
    let totalUsersData = await totalUsersBeforeDate(fromDate);
    let totalUsersSum = parseInt(totalUsersData.total);
    console.log(totalUsersSum);
    let total_users = await countUsersMonthly(fromDate, currentDate);
    total_users.forEach((element) => {
      totalUsersSum += parseInt(element?.count);
      element.count = totalUsersSum;
    });
    data = total_users;
  } else if (type == "new_user") {
    let new_users = await countUsersMonthly(fromDate, currentDate);
    data = new_users;
  } else if (type == "booking") {
    let bookings = await countBookingMonthly(fromDate, currentDate);
    data = bookings;
  }

  data.forEach((element) => {
    months.push(element?.month_name.trim());
  });

  for (let j = 0; j < finalData.length; j++) {
    if (months.indexOf(finalData[j]) > -1) {
      finalData.splice(j, 1, data[months.indexOf(finalData[j])]);
    } else {
      finalData.splice(j, 1, { month_name: finalData[j], count: "0" });
    }
  }

  finalData.forEach((element) => {
    labels.push(element?.month_name.trim());
    labelCounts.push(element?.count);
  });

  let dashboardData = {
    labels: labels.reverse(),
    labelCounts: labelCounts.reverse(),
  };

  res.status(error_code.success).send({
    data: dashboardData,
    status: error_code.success,
  });
};

module.exports = {
  adminLoginCtrl,
  adminForgotPasswordCtrl,
  updatePasswordCtrl,
  changePasswordCtrl,
  dashboardCtrl,
  getChartCtrl,
};
