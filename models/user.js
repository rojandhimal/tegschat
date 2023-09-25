'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_url: {
        type: DataTypes.STRING,
      },
      request_change_password: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
