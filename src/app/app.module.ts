import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import EnvironmentConfig from '../config/environment-config';
import { ApiModule } from 'src/modules/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from 'src/config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [EnvironmentConfig]
    }),
    TypeOrmModule.forRoot(typeOrmOptions),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
