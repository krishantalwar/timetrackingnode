const { Model, Op } = require('sequelize');
module.exports = (sequelize, Sequelize) => {

    class Spot extends Model {

    }

    Spot.init({
        quickspot_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        qs_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        qs_type_id: {
            type: Sequelize.INTEGER,

        },
        qs_style_id: {
            type: Sequelize.INTEGER,

        },

        qs_charges: {
            type: Sequelize.JSONB,
            defaultValue: {}
        },

        qs_charges: {
            type: Sequelize.JSONB,
            defaultValue: {}
        },

        qs_images: {
            type: Sequelize.JSONB,
            defaultValue: {}
        },

        staus: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },

        created_userid: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        created_by: {
            type: Sequelize.STRING,
            defaultValue: "John Doe"
        },
        modified_by: {
            type: Sequelize.STRING,
            defaultValue: null
        },
        // deleted_by: {
        //     type: Sequelize.STRING,
        //     defaultValue: null
        // },
        form_last_step:{
            type:Sequelize.INTEGER
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, {
        sequelize,
        timestamps: true,
        createdAt: "created_on", // alias createdAt as created_on
        updatedAt: "modified_on", // alias updatedAt as updated_at
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'qs_my_quickspot'
    });


    return Spot;
};