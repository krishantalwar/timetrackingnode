module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define(
    "qs_messages",
    {
      qs_chat_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      msg_from: {
        type: Sequelize.INTEGER,
      },
      msg_to: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
      },
      file_path: {
        type: Sequelize.STRING,
      },
      read_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      qs_node: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at", // alias createdAt as created_at
      updatedAt: "updated_at", // alias createdAt as created_at

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: "qs_messages",
    }
  );
  return Chat;
};
