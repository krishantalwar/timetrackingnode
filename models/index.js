const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const logger = (message) => {
  console.log(message);
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  // schema:  dbConfig.DB,
  logging: logger,
  // searchPath:  dbConfig.DB,
});

// console.log(sequelize)
// console.log(Sequelize)
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.lookups = require("./lookup.model")(sequelize, Sequelize);
db.tokens = require("./token.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.roles = require("./roles.model")(sequelize, Sequelize);
db.screen = require("./screen.model")(sequelize, Sequelize);
db.permissions = require("./permissions.model.js")(sequelize, Sequelize);
db.shiftMaster = require("./shift.model")(sequelize, Sequelize);
db.designation = require("./designation.model")(sequelize, Sequelize);
db.department = require("./department.model")(sequelize, Sequelize);
// db.permissions = require("./permissions.model")(sequelize, Sequelize);
db.userDetail = require("./userDetail.model")(sequelize, Sequelize);
db.userType = require("./userType.model")(sequelize, Sequelize);

db.state = require("./state.model")(sequelize, Sequelize);
db.country = require("./country.model")(sequelize, Sequelize);

db.country.hasMany(db.state, {
  // through: db.permissions,
  foreignKey: 'country_id',
  // target: "roleid",
  // otherKey: 'role_id',
  as: 'country_state',
});

db.roles.belongsToMany(db.screen, {
  through: db.permissions,
  foreignKey: 'role_id',
  // target: "roleid",
  otherKey: 'screen_id',
  as: 'screens_permissions'
});

db.roles.hasMany(db.permissions, {
  // through: db.permissions,
  foreignKey: 'role_id',
  // target: "roleid",
  // otherKey: 'role_id',
  as: 'permissions',
});


db.permissions.hasOne(db.roles, {
  // through: db.permissions,
  // foreignKey: 'roleid',
  foreignKey: {
    name: 'roleid'
  },
  sourceKey: 'role_id',
  as: 'roles'
});

db.permissions.hasOne(db.screen, {
  // through: db.permissions,
  // foreignKey: 'roleid',
  foreignKey: {
    name: 'screenid'
  },
  sourceKey: 'screen_id',
  as: 'screens'
});

db.users.hasOne(db.userDetail, {
  foreignKey: {
    name: 'user_id'
  },
  sourceKey: 'userid',
  as: 'userDetail'
});

db.userDetail.hasMany(db.permissions, {
  foreignKey: {
    name: 'role_id'
  },
  sourceKey: 'role_id',
  as: 'user_permissions'
});


// db.spots.hasOne(db.lookups, { foreignKey: "qs_lookup_id", target: "qs_type_id", as: "qs_category" });
// db.spots.hasOne(db.lookups, { foreignKey: "qs_lookup_id", target: "qs_style_id", as: "qs_style" });
// db.spots.hasOne(db.users, { foreignKey: "userid", target: "created_userid", as: "user" });

// db.spots.belongsTo(db.users, {
//   foreignKey: "created_userid",
//   target: "userid",
//   as: "user",
// });

// db.blogs.belongsTo(db.users, {
//   foreignKey: "created_by",
//   target: "userid",
//   as: "user",
// });

// db.booking.belongsTo(db.users, {
//   foreignKey: "userid",
//   target: "userid",
//   as: "qs_looker",
// });

// db.booking.belongsTo(db.bookingStatus, {
//   foreignKey: "bookingstatus_id",
//   target: "bookingstatus_id",
//   as: "qs_booking_status",
// });

module.exports = db;
