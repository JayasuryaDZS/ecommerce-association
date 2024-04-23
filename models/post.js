'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User)
      // define association here
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Post',
  });
  return Post;
};