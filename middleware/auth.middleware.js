"use strict";
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const { decreptJwtToken } = require("../utills/jwtToken");
const { fetchUserDataWithEmail } = require("../queries/user_queries");
const {
  error_code,
  error_messages,
  success_messages,
} = require("../utills/https_messages");

//user authentication and redirection
exports.checkAuth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return next({ status: error_code.unauthorized, message: "No token provided" });
    }
    token = token.replace("Bearer ", "");

    let decoded = await decreptJwtToken(token);

    req.decoded = decoded;
    let userData = await fetchUserDataWithEmail(decoded);
    req.userData = userData.data[0];
    if (userData == null)
      return next({
        status: error_code.unauthorized,
        message: "User does not exist with the email provided",
      });

    return next();
  } catch (err) {
    return next({ message: err.message, status: error_code.unauthorized });
  }
};
