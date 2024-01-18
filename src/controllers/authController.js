// src/controllers/authController.js
const { User } = require('../models');
const authService = require('../services/authServices');
const response = require('../utils/response');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.json(response.success(user));
  } catch (error) {
    res.status(400).json(response.error(error.message));
  }
};

const login = async (req, res) => {
  try {
    console.log(req);
    console.log(req.body);
    const token = await authService.login(req.body);
    res.json(response.success({ token }));
  } catch (error) {
    res.status(401).json(response.error(error.message));
  }
};

module.exports = {
  register,
  login,
};
