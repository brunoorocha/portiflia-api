import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserModule } from '../user/user.module';
import { MulterConfigService } from 'src/config/multer-config.service';
import { LikeService } from './like.service';
import { Project } from 'src/models/entities/project.entity';
import { Like } from 'src/models/entities/like.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Like]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MulterConfigService
    }),
    UserModule
  ],
  providers: [ProjectService, LikeService],
  controllers: [ProjectController]
})
export class ProjectModule {}
