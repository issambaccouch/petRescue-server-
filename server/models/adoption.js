/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adoption', {
    adoption_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    adoptive: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    message: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    pet: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'adoption'
  });
};
