const { Model, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class userJobsTime extends Model {

    }

    userJobsTime.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            user_code: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            user_name: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            job_id: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            job_code: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            job_name: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            date: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            total_hrs: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            time_in: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            time_out: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            break_time: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            late_in: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            early_out: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            paid: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },

            status: {
                type: Sequelize.INTEGER,
                defaultValue: true,
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
            tableName: "user_jobs_time",
        }
    );

    return userJobsTime;
};
