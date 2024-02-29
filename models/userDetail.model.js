const { Model, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class UserDetail extends Model {

    }

    UserDetail.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            user_info: {
                type: Sequelize.TEXT,
                defaultValue: null,
            },
            // admin,employer ,employee
            user_type: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            company_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            reporting_manager_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            reporting_manager_name: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            // employee , reporting manger
            role_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            role_code: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            role_name: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            shift_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            shift_code: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            shift_name: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            designation_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            designation_code: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            designation_name: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            department_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            department_code: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            department_name: {
                type: Sequelize.STRING,
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
            tableName: "user_detail",
        }
    );

    return UserDetail;
};
