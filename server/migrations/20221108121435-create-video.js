'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title is required'
          },
          notEmpty: {
            msg: 'Title is required'
          }
        }
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Video link is required'
          },
          notEmpty: {
            msg: 'Video link is required'
          }
        }
      },
      channel: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Channel is required'
          },
          notEmpty: {
            msg: 'Channel is required'
          }
        }
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Views is required'
          },
          notEmpty: {
            msg: 'Views is required'
          }
        }
      },
      dateUpload: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Upload Date is required'
          },
          notEmpty: {
            msg: 'Upload Date is required'
          }
        }
      },
      isVerified: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Videos');
  }
};