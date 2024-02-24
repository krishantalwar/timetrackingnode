const { Model, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  class ShiftMaster extends Model {
   
  }

  ShiftMaster.init(
    {
      shiftid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shift_code: {
        type: Sequelize.STRING,
        defaultValue: null,
          //  allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
       
         allowNull: false,
          unique: true
          },
      start_time: {
        type: Sequelize.TIME,
        defaultValue: null,
          },
            end_time: {
        type: Sequelize.TIME,
        defaultValue: null,
          },
            
    break_start_time: {
        type: Sequelize.TIME,
        defaultValue: null,
          },
        break_end_time: {
        type: Sequelize.TIME,
        defaultValue: null,
          },
   
    overtime_start_time: {
        type: Sequelize.TIME,
        defaultValue: null,
          },   
    
    
    overtime_end_time: {
        type: Sequelize.TIME,
        defaultValue: null,
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
      tableName: "shift_master",
    }
  );

  return ShiftMaster;
};
