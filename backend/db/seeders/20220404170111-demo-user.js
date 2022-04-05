'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Demo Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        fullName: 'King Bob',
        email: 'user1@user.io',
        banner: 'https://s3.envato.com/files/269237156/DSC_7445%20copy%2077.jpg',
        profilePic: 'https://static.wikia.nocookie.net/mycun-the-movie/images/c/ca/Bob-from-the-minions-movie.jpg/revision/latest?cb=20170520163724',
        username: 'kingbob',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        fullName: 'Kevin',
        email: 'user2@user.io',
        banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgXjakAo176lX1L5FopzT9NBofh6WBqZjftQ&usqp=CAU',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxvj9269xED18VjkBltzBraB-nd7tRDk49Sw&usqp=CAU',
        username: 'kevintheminion',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};