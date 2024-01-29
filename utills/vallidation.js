const Joi = require("joi");

const userSignupSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(32),
    referral_code: Joi.string().allow(""),
    email_notification: Joi.boolean()
});

const userLoginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(32),
    resetLink: Joi.string().allow("")
});

module.exports={
    userSignupSchema,
    userLoginSchema
}