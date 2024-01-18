// src/services/authService.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async ({ firstName, lastName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ email: user.email }, 'your_secret_key');
  return token;
};

module.exports = {
  register,
  login,
};
