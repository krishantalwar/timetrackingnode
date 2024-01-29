module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define(
    "qs_booking",
    {
      booking_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: Sequelize.INTEGER,
      },
      quickspot_id: {
        type: Sequelize.INTEGER,
      },
      slotdate: {
        type: Sequelize.DATE,
      },
      slotweekday: {
        type: Sequelize.INTEGER,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      bookingstatus_id: {
        type: Sequelize.INTEGER,
      },
      booking_info: {
        type: Sequelize.JSONB,
      },
      booked_amenities: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      booked_add_ons: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      created_by: {
        type: Sequelize.STRING,
        defaultValue: "John Doe",
      },
      modified_by: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
      createdAt: "created_on", // alias createdAt as created_on
      updatedAt: "modified_on", // alias updatedAt as modified_on

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: "qs_booking",
    }
  );
  return Booking;
};
