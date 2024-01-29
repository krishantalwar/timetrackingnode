module.exports = (sequelize, Sequelize) => {
  const BookingStatus = sequelize.define(
    "qs_bookingstatus",
    {
      bookingstatus_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      staus_desc: {
        type: Sequelize.STRING,
      },
      serial_order: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: "qs_bookingstatus",
    }
  );
  return BookingStatus;
};
