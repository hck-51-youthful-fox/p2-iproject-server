'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Log.belongsTo(models.User)
      // ! --- LOG -->>-- USER

    }
  }
  Log.init({
    userId: {
      type: DataTypes.INTEGER
    },
    radio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Callsign lawan tidak boleh kosong' },
        notEmpty: { msg: 'Callsign lawan tidak boleh kosong' },
      }
    },
    freq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Frekuensi tidak boleh kosong' },
        notEmpty: { msg: 'Frekuensi tidak boleh kosong' },
      }
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Mode tidak boleh kosong' },
        notEmpty: { msg: 'Mode tidak boleh kosong' },
      }
    },
    rstSent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'RST Kirim tidak boleh kosong' },
        notEmpty: { msg: 'RST Kirim tidak boleh kosong' },
      }
    },
    rstRcv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'RST Terima tidak boleh kosong' },
        notEmpty: { msg: 'RST Terima tidak boleh kosong' },
      }
    },
    exchSent: {
      type: DataTypes.STRING
    },
    exchRcv: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};