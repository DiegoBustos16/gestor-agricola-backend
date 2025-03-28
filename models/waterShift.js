const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const WaterShift = sequelize.define('WaterShift', {
    
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'water_shifts',
    timestamps: false,
  });

  return WaterShift;
};