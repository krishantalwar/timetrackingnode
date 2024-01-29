const { Model, Op } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Blog extends Model {}

  Blog.init(
    {
      blog_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      blog_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      image: {
        type: Sequelize.JSONB,
        defaultValue: {},
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
      deleted_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      tableName: "qs_blog",
    }
  );

  return Blog;
};
