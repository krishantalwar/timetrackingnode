
const otpGenerator = require('otp-generator');

const { OTP_Length, OTP_Config } = require('../constants/otp-generator-constant');

module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(OTP_Length, OTP_Config);
    return OTP;
};