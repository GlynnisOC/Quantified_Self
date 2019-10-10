'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Meals', [{
      name: 'Breakfast',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lunch',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dinner',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dessert',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
