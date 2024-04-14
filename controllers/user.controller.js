const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {
  userService,
  S3Bucket,
  emailTemplateService,
  handleBarService,
  emailService,
} = require("../services");
const { generateRandamKeyCode } = require("../utills/common");
// const { updateUserResetLinkData } = require("../queries/user_queries");
const { mailerTransporter } = require("../utills/mailer_transporter");
const multer = require("multer");
const bcrypt = require('bcryptjs');

const createUser = catchAsync(async (req, res) => {

  // console.log(req)
  console.log(req.body)
  console.log(req?.files)
  // console.log(req?.file)

  // console.log(req?.upload_document)
  // console.log(req?.upload_documents)

  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads//uploads')
  //   },
  //   filename: function (req, file, cb) {
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //     cb(null, file.fieldname + '-' + uniqueSuffix)
  //   }
  // })

  // const upload = multer({ storage: storage })

  // upload.array("upload_documents", 10)




  // //delete after new email service create


  // const emailTemplate = await emailTemplateService.getEmailTemplateByAction(
  //   "CREATE_PASSWORD"
  // );

  // updateUserResetLinkData({ resetLink: key, email: user.email }).then(
  //   async (data) => {
  //     if (!!emailTemplate) {
  //       var data = {
  //         link: `${process.env.FRONTEND_BASE_URL}/create-password?key=${key}&email=${user.email}`,
  //       };

  //       const plainHtml = await handleBarService.getPlainHtml(
  //         emailTemplate.email_body,
  //         data
  //       );

  //       let info = {
  //         from: "<cgt.pawan.test@gmail.com>", // sender address
  //         to: `${user.email}`, // list of receivers
  //         subject: emailTemplate?.email_subject, // Subject line
  //         // text: "Hello world?", // plain text body
  //         html: plainHtml, // html body
  //       };
  //       mailerTransporter().sendMail(info, (error, body) => {
  //         if (error) {
  //           return res
  //             .status(error_code.badRequest)
  //             .send({ message: error.message, status: error_code.badRequest });
  //         }
  //         // if (body) {
  //         //     // console.log(body)
  //         //     res.status(error_code.success).send({ message: user_success_messages.reset_password_link_sent, status: error_code.success })
  //         // }
  //       });
  //     }
  //   },
  //   (err) => {
  //     return res.status(error_code.serverSideError).send({ error: err });
  //   }
  // );



  // console.log(user)
  // console.log(user.userid)

  // add user comment
  // const user = await userService.createUser(req.body);

  // const key = generateRandamKeyCode();

  // const asd = await bcrypt.hash(key, 8);

  // await userService.updateUserById(user.userid, {
  //   "password": asd
  // });

  // if (user) {
  //   await emailService.sendResetPasswordEmail(user.email, key);
  //   // res.status(httpStatus.CREATED).send({ "asda": "asdasd" });
  // }

  // res.status(httpStatus.CREATED).send({ "asda": "asdasd" });
  const files = req?.files ?? {};
  res.status(httpStatus.CREATED).send(files);
});

const createSignupUser = catchAsync(async (req, res) => {

  const body = req.body;
  body.employe_code = (await userService.getCode()).code;



  // add user comment
  const user = await userService.createUser(body);

  // const key = generateRandamKeyCode();

  // const asd = await bcrypt.hash(key, 8);

  // await userService.updateUserById(user.userid, {
  //   "password": asd
  // });

  if (user) {
    await emailService.sendRegisterEmail(user.email);
    // res.status(httpStatus.CREATED).send({ "asda": "asdasd" });
  }

  // res.status(httpStatus.CREATED).send({ "asda": "asdasd" });
  const files = req?.files ?? {};
  res.status(httpStatus.CREATED).send(files);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["search"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  console.log(result)
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserDetailsById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // if (user.dataValues.user_info?.image?.key) {
  //     user.dataValues.user_info.image.url = await S3Bucket.getDownloadUrl(user.dataValues.user_info.image.key)
  // }

  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  // console.log("krisha", req.params.userid)
  console.log("krisha", req.body)
  const user = await userService.updateUserById(req.body.userid, req.body);
  const key = generateRandamKeyCode();

  const asd = await bcrypt.hash(key, 8);

  await userService.updateUserById(user.userid, {
    "password": asd
  });

  if (user) {
    await emailService.sendResetPasswordEmail(user.email, key);
    // res.status(httpStatus.CREATED).send({ "asda": "asdasd" });
  }
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getExportUsers = catchAsync(async (req, res) => {
  const result = await userService.exportUsers();
  res.send(result);
});

const getCode = catchAsync(async (req, res) => {
  const result = await userService.getCode();
  res.send(result);
});

module.exports = {
  createUser,
  createSignupUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getExportUsers,
  getCode
};
