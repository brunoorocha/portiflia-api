import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import EnvironmentConfig from './environment-config';

dotenv.config();

const envConfig = EnvironmentConfig();

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envConfig.database.host,
  username: envConfig.database.user,
  password: envConfig.database.pass,
  database: envConfig.database.name,
  port: envConfig.database.port,

  entities: ['dist/models/entities/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/models/migrations/*.js'],

  cli: {
    entitiesDir: 'src/models/entities',
    migrationsDir: 'src/models/migrations'
  },

  synchronize: true,
  ssl: envConfig.database.ssl == 'true'
}
