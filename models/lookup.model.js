module.exports = (sequelize, Sequelize) => {
    const Lookup = sequelize.define("qs_lookup_info", {
        qs_lookup_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        qs_lookup_key: {
            type: Sequelize.STRING
        },
        qs_lookup_desc: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        qs_lookup_details: {
            type: Sequelize.JSONB
        },
        status: {
            type: Sequelize.INTEGER
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
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, {
        timestamps: true,
        createdAt: "created_on", // alias createdAt as created_on
        updatedAt: "modified_on", // alias updatedAt as updated_at

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'qs_lookup_info'
    });
    return Lookup;
};