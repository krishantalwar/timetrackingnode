const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {
  userService,
  S3Bucket,
  emailTemplateService,
  handleBarService,
} = require("../services");
const { generateRandamKeyCode } = require("../utills/common");
// const { updateUserResetLinkData } = require("../queries/user_queries");
const { mailerTransporter } = require("../utills/mailer_transporter");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  //delete after new email service create
  const key = generateRandamKeyCode();

  const emailTemplate = await emailTemplateService.getEmailTemplateByAction(
    "CREATE_PASSWORD"
  );

  updateUserResetLinkData({ resetLink: key, email: user.email }).then(
    async (data) => {
      if (!!emailTemplate) {
        var data = {
          link: `${process.env.FRONTEND_BASE_URL}/create-password?key=${key}&email=${user.email}`,
        };

        const plainHtml = await handleBarService.getPlainHtml(
          emailTemplate.email_body,
          data
        );

        let info = {
          from: "<cgt.pawan.test@gmail.com>", // sender address
          to: `${user.email}`, // list of receivers
          subject: emailTemplate?.email_subject, // Subject line
          // text: "Hello world?", // plain text body
          html: plainHtml, // html body
        };
        mailerTransporter().sendMail(info, (error, body) => {
          if (error) {
            return res
              .status(error_code.badRequest)
              .send({ message: error.message, status: error_code.badRequest });
          }
          // if (body) {
          //     // console.log(body)
          //     res.status(error_code.success).send({ message: user_success_messages.reset_password_link_sent, status: error_code.success })
          // }
        });
      }
    },
    (err) => {
      return res.status(error_code.serverSideError).send({ error: err });
    }
  );

  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["search"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
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
  const user = await userService.updateUserById(req.params.userId, req.body);
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

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getExportUsers,
};
