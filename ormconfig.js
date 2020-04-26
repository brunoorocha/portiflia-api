// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EnvironmentConfig = require('../portifolia-api/src/config/environment-config');

dotenv.config();

const envConfig = EnvironmentConfig();

module.exports = {
  type: 'postgres',
  host: envConfig.database.host,
  username: envConfig.database.user,
  password: envConfig.database.pass,
  database: envConfig.database.name,
  port: envConfig.database.port,

  entities: ['src/models/entities/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/models/migrations/*.ts'],

  cli: {
    entitiesDir: 'src/models/entities',
    migrationsDir: 'src/models/migrations'
  },

  synchronize: true,
}
