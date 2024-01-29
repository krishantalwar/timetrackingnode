const { Model, Op } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Faq extends Model {
    static isQuestionExcludeId = async (question, excludeFaqId) => {
      const faq = await Faq.findOne({
        where: {
          [Op.and]: [
            { question: { [Sequelize.Op.iLike]: question } },
            { faq_id: { [Op.ne]: excludeFaqId } },
          ],
        },
        raw: true,
      });
      return !!faq;
    };
    static isQuestion = async (question) => {
      const faq = await Faq.findOne({
        where: {
          question: { [Sequelize.Op.iLike]: question },
        },
        raw: true,
      });
      return !!faq;
    };
  }

  Faq.init(
    {
      faq_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      created_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      modified_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "created_on", // alias createdAt as created_on
      updatedAt: "modified_on", // alias updatedAt as updated_at
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: "qs_manage_faq",
    }
  );

  return Faq;
};
