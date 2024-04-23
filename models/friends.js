'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Friends.belongsTo(models.User);
      // define association here
    }
  }
  Friends.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Friends',
  });
  return Friends;
};