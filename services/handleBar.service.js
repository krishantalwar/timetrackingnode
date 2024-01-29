const Handlebars = require("handlebars");

const getPlainHtml = async (htmlTemplate, data) => {
  const template = Handlebars.compile(htmlTemplate);
  const result = template(data);
  return result;
};

module.exports = {
  getPlainHtml,
};
