import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get('app.port') || 3000;
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  console.log(`Start to listen on port ${port}`)
  await app.listen(port);
}
bootstrap();
