'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('UserDetails', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'add_fkey__user-details__user-id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
    await queryInterface.addConstraint('LogSpotters', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'add_fkey__log-spotters__user-id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Logs', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'add_fkey__logs__user-id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserDetails', 'add_fkey__user-details__user-id')
    await queryInterface.removeConstraint('LogSpotters', 'add_fkey__log-spotters__user-id')
    await queryInterface.removeConstraint('Logs', 'add_fkey__logs__user-id')
  }
};
