const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Spring', 'Summer', 'Autumn', 'Winter']]
      }
    },
  });
}