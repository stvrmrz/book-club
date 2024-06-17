'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password', // In a real application, use hashed passwords
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    await queryInterface.bulkInsert('books', [
      {
        title: 'Dune',
        author: 'Frank Herbert',
        description: 'A science fiction novel.',
        userId: user[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
