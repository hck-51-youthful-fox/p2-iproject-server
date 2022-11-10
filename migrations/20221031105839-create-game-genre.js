'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GameGenres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GameId: {
        type: Sequelize.INTEGER,
				references: {
					model: "Games",
					key: "id",
				},
				onUpdate: "cascade",
				onDelete: "cascade",
      },
      GenreId: {
        type: Sequelize.INTEGER,
				references: {
					model: "Genres",
					key: "id",
				},
				onUpdate: "cascade",
				onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GameGenres');
  }
};