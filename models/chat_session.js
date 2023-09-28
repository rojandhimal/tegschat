'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat_session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat_session.init(
    {
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM('PRIVATE', 'PUBLIC', 'CLOSED'),
        defaultValue: 'PRIVATE',
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      blocked_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Chat_session',
    }
  );
  return Chat_session;
};
