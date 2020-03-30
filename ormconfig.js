
module.exports = {
  type: 'postgres',
  host: 'localhost',
  username: 'dibbbre',
  password: 'dibbbredbpass',
  database: 'dibbbre',
  port: 5432,

  entities: ['src/models/entities/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/models/migrations/*.ts'],

  cli: {
    entitiesDir: 'src/models/entities',
    migrationsDir: 'src/models/migrations'
  },

  synchronize: true,
}
