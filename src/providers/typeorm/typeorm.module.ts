import { Module } from '@nestjs/common';
import { TypeormProvider } from './typeorm.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [TypeormProvider]
})
export class TypeormModule {}
