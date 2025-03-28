const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const IrrigationLog = sequelize.define('IrrigationLog', {
    quadrant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    waterShiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'irrigation_logs',
    timestamps: false,
  });

  return IrrigationLog;
};
