import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormProvider implements TypeOrmOptionsFactory {
  constructor (private configService: ConfigService) {}

	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const mongodbHost = this.configService.get<string>('database.host');

		return {
			type: 'mongodb',
      url: mongodbHost,
      entities: ['../../models/entities/*.entity.ts'],
      migrations: ['../../models/migrations/*.migration.ts'],
      migrationsTableName: 'migrations',
			synchronize: true,
			useNewUrlParser: true
		}
	}
}
