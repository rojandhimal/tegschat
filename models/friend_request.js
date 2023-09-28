'use strict';
const { Model } = require('sequelize');
const { EFriendRequestStatus } = require('../constant/enum/friendrequest');
module.exports = (sequelize, DataTypes) => {
  class Friend_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Friend_request.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          EFriendRequestStatus.PENDING,
          EFriendRequestStatus.ACCEPTED,
          EFriendRequestStatus.REJECTED,
          EFriendRequestStatus.CANCELED
        ),
        defaultValue: EFriendRequestStatus.PENDING,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Friend_request',
    }
  );
  return Friend_request;
};
