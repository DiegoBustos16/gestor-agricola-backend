const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('Conectado a PostgreSQL con Sequelize'))
  .catch((err) => console.error('Error de conexión:', err));

module.exports = sequelize;

const WaterShift = require('./waterShift')(sequelize);
const IrrigationLog = require('./irrigationLog')(sequelize);

WaterShift.hasMany(IrrigationLog, { foreignKey: 'waterShiftId' });
IrrigationLog.belongsTo(WaterShift, { foreignKey: 'waterShiftId' });

sequelize.sync()
  .then(() => console.log('Tablas creadas o actualizadas con Sequelize'))
  .catch((error) => console.error('Error al sincronizar modelos:', error));

module.exports = {
  sequelize,
  WaterShift,
  IrrigationLog,
};
