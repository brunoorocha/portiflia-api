import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import EnvironmentConfig from '../config/environment-config';
// import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [EnvironmentConfig]
    }),
    // ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
