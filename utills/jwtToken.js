const jwt = require('jsonwebtoken');

const defaultSecret = 'bvcvbbhf&)hvgdbsclh';
const defaultExpiryHours = '7d'
const generateJwtToken = (email) => {
    return jwt.sign({
        data: email
    }, process.env.jwtSecret || defaultSecret, { expiresIn: process.env.jwtSecretExpiry || defaultExpiryHours});

};

const generateJwtTokenForResetPassword = (email) => {
    return jwt.sign({
        data: email
    }, process.env.jwtSecret || defaultSecret, { expiresIn: '15m'});

};

const decreptJwtToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.jwtSecret || defaultSecret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded.data);
            }
        });
    });
}

module.exports = {
    generateJwtToken,
    decreptJwtToken,
    generateJwtTokenForResetPassword
}