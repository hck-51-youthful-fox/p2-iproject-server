'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogSpotter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ! --- LOG SPOTTER -->>-- USER
      LogSpotter.belongsTo(models.User)

    }
  }
  LogSpotter.init({
    userId: {
      type: DataTypes.INTEGER,
    },
    freq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Frekuensi tidak boleh kosong'},
        notEmpty: { msg: 'Frekuensi tidak boleh kosong'},
      }
    },
    radio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Callsign Lawan tidak boleh kosong'},
        notEmpty: { msg: 'Callsign Lawan tidak boleh kosong'},
      }
    },
    info: DataTypes.STRING,
    dxcc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LogSpotter',
  });
  return LogSpotter;
};