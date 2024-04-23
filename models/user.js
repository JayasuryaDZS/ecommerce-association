'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserDetails)

      User.hasMany(models.Post)

      User.hasMany(models.Friends)

      User.belongsToMany(models.Groups, {
        through: "UserGroups"
      })
      // define association here
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'User',
  });
  return User;
};