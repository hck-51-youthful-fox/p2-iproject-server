'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      radio: {
        allowNull: false,
        type: Sequelize.STRING
      },
      freq: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rstSent: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rstRcv: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      exchSent: {
        type: Sequelize.STRING
      },
      exchRcv: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Logs');
  }
};