import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormProvider implements TypeOrmOptionsFactory {
  constructor (private configService: ConfigService) {}

	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		const dbHost = this.configService.get<string>('database.host');
		const dbName = this.configService.get<string>('database.name');
		const dbUser = this.configService.get<string>('database.user');
		const dbPass = this.configService.get<string>('database.pass');
		const dbPort = parseInt(this.configService.get<string>('database.port'));

		return {
			type: 'postgres',
			host: dbHost,
			username: dbUser,
			password: dbPass,
			database: dbName,
			port: dbPort,

      entities: ['src/models/entities/*.entity.ts'],
      migrationsTableName: 'migrations',
			migrations: ['src/models/migrations/*.migration.ts'],

			cli: {
				entitiesDir: 'src/models/entities',
				migrationsDir: 'src/models/migrations'
			},

			synchronize: true,
		}
	}
}
