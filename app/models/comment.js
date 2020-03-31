'use strict'
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      text: { type: DataTypes.STRING(500), allowNull: false },
      ip: { type: DataTypes.STRING, allowNull: false },
      episodeId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  )
  Comment.associate = function(models) {
    // associations can be defined here
  }

  Comment.findCommentsViaEpisodeIds = function(episodeIds) {
    return Comment.findAll({
      where: {
        episodeId: {
          [Sequelize.Op.or]: episodeIds
        }
      },
      raw: true,
      order: [['createdAt', 'DESC']]
    })
  }
  return Comment
}
