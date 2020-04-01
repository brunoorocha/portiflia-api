import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [AuthModule, UserModule, ProjectModule, ImagesModule],
  exports: [AuthModule, UserModule, ProjectModule, ImagesModule]
})
export class ApiModule {}
