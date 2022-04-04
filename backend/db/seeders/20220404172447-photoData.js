'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Photos', [
      {
        userId: 1,
        imageUrl: 'https://images.unsplash.com/photo-1649078805879-46792aacc351?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        content: 'Sakura Stroll'
      },
      {
        userId: 1,
        imageUrl: 'https://images.unsplash.com/photo-1648933142932-47c00d284ecf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        content: 'Desert'
      },
      {
        userId: 1,
        imageUrl: 'https://images.unsplash.com/photo-1648907833494-8c8e0eac7046?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        content: 'Ocean'
      },
      {
        userId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1649000942866-e89fd06ab3d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        content: 'Cookies'
      },
      {
        userId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1649073344721-7b91565443c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        content: 'Burger'
      },
      {
        userId: 2,
        imageUrl: 'https://images.unsplash.com/photo-1648912607168-88b8db633771?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        content: 'Oatmeal'
      },
      {
        userId: 3,
        imageUrl: 'https://images.unsplash.com/photo-1648974783311-a24c95296f5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        content: 'Skyscraper'
      },
      {
        userId: 3,
        imageUrl: 'https://images.unsplash.com/photo-1649074799292-0f544ef7cdf6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        content: 'Pointy Bulding'
      },
      {
        userId: 3,
        imageUrl: 'https://images.unsplash.com/photo-1648824964352-95fbc2e3bb0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        content: 'Floofs'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
