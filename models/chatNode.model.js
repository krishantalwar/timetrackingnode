module.exports = (sequelize, Sequelize) => {
  const ChatNode = sequelize.define(
    "qs_message_node",
    {
      qs_node_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      spot_id: {
        type: Sequelize.INTEGER,
      },
      participants: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
    },
    {
      timestamps: true,
      createdAt:"created_at",
      updatedAt:"updated_at",
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: "qs_message_node",
    }
  );

  return ChatNode;
};
