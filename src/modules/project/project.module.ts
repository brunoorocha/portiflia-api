import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserModule } from '../user/user.module';
import { Project } from 'src/models/entities/project.entity';
import { ConfigModule } from '@nestjs/config';
import { MulterConfigService } from 'src/config/multer-config.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MulterConfigService
    }),
    UserModule
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
