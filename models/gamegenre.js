'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameGenre.init({
    GameId: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'GameGenre',
  });
  return GameGenre;
};