'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Friends.init(
    {
      block_by: DataTypes.INTEGER,
      chat_session_id: {
        type: DataTypes.INTEGER,
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_friend: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
      user_a: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_b: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Friends',
    }
  );
  return Friends;
};
