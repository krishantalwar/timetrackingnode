const { Model, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class Job extends Model {

    }
    Job.init(
        {
            jobid: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            job_code: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            name: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            desciption: {
                type: Sequelize.TEXT,
                defaultValue: null,
            },
            country: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: true,
            },
            state: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            rating: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            job_rate: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            start_date: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            end_date: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            rate: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
        },
        {
            sequelize,
            timestamps: true,
            createdAt: "created_on", // alias createdAt as created_on
            updatedAt: "modified_on", // alias updatedAt as modified_on
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,

            // define the table's name
            tableName: "job",
        }
    );

    return Job;
};
