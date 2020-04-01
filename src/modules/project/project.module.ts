import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/models/entities/project.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UserModule
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
