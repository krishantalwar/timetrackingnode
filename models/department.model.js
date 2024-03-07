const { Model, Op } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
  class Department extends Model {

  }

  Department.init(
    {
      departmentid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: true,
      },
      company_id: {
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
      // defaultScope: {
      //   where: {
      //     active: true,
      //     compnay_id: user_id
      //   }
      // },
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
      tableName: "department",
    }
  );

  return Department;
};
