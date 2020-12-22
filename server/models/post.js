/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    post_description: {
      type: DataTypes.STRING(6000),
      allowNull: false
    },
    post_localisation: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    post_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    post_user: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    post_pet: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'pet',
        key: 'pet_id'
      }
    },
    post_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    post_image: {
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
    tableName: 'post'
  });
};
