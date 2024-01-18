// src/utils/response.js
const success = (data) => ({ success: true, data });
const error = (message) => ({ success: false, error: message });

module.exports = {
  success,
  error,
};
