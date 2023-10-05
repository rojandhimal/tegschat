'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat_message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat_message.init({
    user_id: DataTypes.STRING,
    chat_session_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN,
    is_unsent: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Chat_message',
  });
  return Chat_message;
};