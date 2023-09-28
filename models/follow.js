'use strict';
const { Model } = require('sequelize');
const { EFollowStatus } = require('../constant/enum/follow');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Follow.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(EFollowStatus.FOLLOWING, EFollowStatus.UNFOLLOW),
        defaultValue: EFollowStatus.FOLLOWING,
      },
    },
    {
      sequelize,
      modelName: 'Follow',
    }
  );
  return Follow;
};
