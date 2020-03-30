import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'dibbbre-postgres',
  username: 'dibbbre',
  password: 'dibbbredbpass',
  database: 'dibbbre',
  port: 5432,

  entities: ['dist/models/entities/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/models/migrations/*.js'],

  cli: {
    entitiesDir: 'src/models/entities',
    migrationsDir: 'src/models/migrations'
  },

  synchronize: true,
}
