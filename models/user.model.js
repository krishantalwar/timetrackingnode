const { Model, Op } = require("sequelize");

const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    static isEmailTaken = async (email, excludeUserId) => {
      const user = await User.findOne({
        where: {
          [Op.and]: [{ email: email }, { userid: { [Op.ne]: excludeUserId } }],
        },
        raw: true,
      });
      return !!user;
    };

    static isNmailTakenWith = async (email, excludeUserId) => {
      const user = await User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
      //       false
      // true
      // true
      console.log(user)
      // console.log(!user)
      // console.log(!!user)
      return !!user;
    };


    isPasswordMatch = async function (password) {
      // console.log(password)
      const user = this;
      // console.log(user);
      return bcrypt.compare(password, user.password);
    };

  }

  User.init(
    {
      userid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      first_name: {
        type: Sequelize.STRING,
        defaultValue: null,
      },

      last_name: {
        type: Sequelize.STRING,
        defaultValue: null,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        // defaultValue: null,
        set(value) {
          if (value != "" || value != null || value != undefined) {
            this.setDataValue('password', (value));
          } else {
            this.setDataValue('password', hash(this.username + value));
          }
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          // Using the username as a salt is better.

        }
      },

      // user_referral_code: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      // },

      // referral_code: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      // },
      // email_notification: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      // },


      status: {
        type: Sequelize.INTEGER,
        defaultValue: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        defaultValue: true,
      },
      // verification_status: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // },
      verification_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },


      resetlink: {
        type: Sequelize.STRING,
        defaultValue: null,
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
      tableName: "users",
    }
  );
  // User.removeAttribute('password');
  // User.removeAttribute('username');
  // User.removeAttribute('user_referral_code');
  // User.removeAttribute('referral_code');
  // User.removeAttribute('verification_code');
  // User.removeAttribute('created_by');
  // User.removeAttribute('modified_by');
  return User;
};
