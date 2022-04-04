'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};