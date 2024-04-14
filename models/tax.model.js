const { Model, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Tax extends Model {

  }

  Tax.init(
    {
      Taxid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      company_id: {
        type: Sequelize.INTEGER,
        defaultValue: true,
      },
      tax_rate: {
        type: Sequelize.INTEGER,
        defaultValue: true,
      },
      created_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      modified_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      deleted_by: {
        type: Sequelize.STRING,
        defaultValue: null
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      createdAt: "created_on", // alias createdAt as created_on
      updatedAt: "modified_on", // alias updatedAt as modified_on
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: "tax",
    }
  );

  return Tax;
};
