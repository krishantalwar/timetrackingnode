const { Model, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class Permissions extends Model {
   
    


  }

  Permissions.init(
    {
      premissionid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      screen_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      screen_name: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
        role_id: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // user_id: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      // },
      // user_code: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      // },

    view: {
            type: Sequelize.STRING,
            defaultValue: false,
          },
    edit: {
            type: Sequelize.STRING,
            defaultValue: false,
          },
    delete: {
            type: Sequelize.STRING,
            defaultValue: false,
          },
        

        

      status: {
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
      tableName: "permissions",
    }
  );

  return Permissions;
};
