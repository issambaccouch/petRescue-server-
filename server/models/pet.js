/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pet', {
    pet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pet_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pet_race: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pet_status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pet_age: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pet_picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pet_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    owner: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    pet_sex: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'pet'
  });
};
