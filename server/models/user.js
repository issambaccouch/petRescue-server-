/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_firstname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_lastname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roles: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'user'
  });
};
