const { Model, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    class Country extends Model {

    }

    Country.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: Sequelize.STRING,
                defaultValue: null,
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
            tableName: "country",
        }
    );

    return Country;
};
