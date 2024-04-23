'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDetails.belongsTo(models.User)
      // define association here
    }
  }
  UserDetails.init({
    userId:DataTypes.INTEGER,
    mobileNo: DataTypes.STRING,
    password: DataTypes.STRING, 
    noOfPost: DataTypes.INTEGER,
    bio: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'UserDetails',
  });
  return UserDetails;
};