const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, Sequelize) => {
    const Lookup = sequelize.define("auth_token",
        {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: Sequelize.STRING,
            required: true,
        },
        user: {
            type: Sequelize.STRING,
            required: true,
        },
        type: {
            type: Sequelize.ENUM([tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]),
            required: true,
        },
        expires: {
            type: Sequelize.DATE,
            required: true,
        },
        created_by: {
            type: Sequelize.STRING,
            defaultValue: "John Doe"

        },
        modified_by: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        deleted_by: {
            type: Sequelize.STRING,
            defaultValue: null
        },
    }, {
        timestamps: true,
        createdAt: "created_on", // alias createdAt as created_on
        updatedAt: "modified_on", // alias updatedAt as updated_at
   paranoid: true,  
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'auth_token'
    });
    return Lookup;
};