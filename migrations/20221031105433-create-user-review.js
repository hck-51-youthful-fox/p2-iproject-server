'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      review: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      UserId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
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
    await queryInterface.dropTable('UserReviews');
  }
};