'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ! --- USER -->>-- USER DETAIL
      User.hasOne(models.UserDetail)

      // ! --- USER -->>-- LOG
      User.hasMany(models.Log)

      // ! --- USER -->>-- LOG SPOTTER
      User.hasMany(models.LogSpotter)
      
    }
  }
  User.init({
    callsign: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Callsign harus unik'},
      validate: {
        notNull: { msg: 'Callsign tidak boleh kosong' },
        notEmpty: { msg: 'Callsign tidak boleh kosong' },
        len: {
          args: [3, 9],
          msg: 'Callsign harus diantara 3-9 karakter'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email harus unik'},
      validate: {
        notNull: { msg: 'Email tidak boleh kosong' },
        notEmpty: { msg: 'Email tidak boleh kosong' },
        isEmail: { msg: 'Bukan format email' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password tidak boleh kosong' },
        notEmpty: { msg: 'Password tidak boleh kosong' },
      }

    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};