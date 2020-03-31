'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Comments',
      [
        {
          text: 'Anakin is a Douche',
          episodeId: 7,
          ip: '192.0.0.2',
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          text: 'Dark Vader Pls',
          episodeId: 6,
          ip: '192.0.0.1',
          updatedAt: new Date(),
          createdAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Comments', null, {})
}
