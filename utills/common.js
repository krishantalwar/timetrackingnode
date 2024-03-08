const voucher_codes = require('voucher-code-generator');
generateRandamPromoCode = () => {
    const vocherList = voucher_codes.generate({
        length: process.env.promoCodeLength || 5,
        count: 1,
        charset: "AaBACcyYUupPQqWwEeRrTtMmNnVvLlKkSsDdGgHhJj0123456789"
    });
    return vocherList[0]
};

generateRandamOTPCode = () => {
    const vocherList = voucher_codes.generate({
        length: process.env.otpLength || 4,
        count: 1,
        charset: "0123456789"
    });
    return vocherList[0]
};

generateRandamKeyCode = () => {
    const vocherList = voucher_codes.generate({
        length: process.env.keyLength || 32,
        count: 1
    });
    return vocherList[0]
};

module.exports = {
    generateRandamPromoCode,
    generateRandamOTPCode,
    generateRandamKeyCode
}