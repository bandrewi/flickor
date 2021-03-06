'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  Favorite.associate = function (models) {
    Favorite.belongsTo(models.User, { foreignKey: 'userId' })
    Favorite.belongsTo(models.Photo, { foreignKey: 'photoId' })
  };
  return Favorite;
};