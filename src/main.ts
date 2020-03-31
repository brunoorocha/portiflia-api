import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('app.port') || 3000;
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(port);
}
bootstrap();
