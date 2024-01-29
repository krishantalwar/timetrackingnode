const { Model, Op } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class HelpTopic extends Model {
    static isSameTopicExcludeId = async (topic, excludeHelpTopicId) => {
      const helpTopic = await HelpTopic.findOne({
        where: {
          [Op.and]: [
            { topic: { [Sequelize.Op.iLike]: topic } },
            { help_topic_id: { [Op.ne]: excludeHelpTopicId } },
          ],
        },
        raw: true,
      });
      return !!helpTopic;
    };
    static isSameTopic = async (topic) => {
      const helpTopic = await HelpTopic.findOne({
        where: {
          topic: { [Sequelize.Op.iLike]: topic },
        },
        raw: true,
      });
      return !!helpTopic;
    };
  }

  HelpTopic.init(
    {
      help_topic_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      topic: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      user_type: {
        type: Sequelize.STRING,
        defaultValue: "Lookers",
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
      tableName: "qs_manage_help_topic",
    }
  );

  return HelpTopic;
};
