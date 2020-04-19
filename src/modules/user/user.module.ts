import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { IsUsernameAlreadyInUse } from 'src/modules/user/validators/isUsernameAlreadyInUse';
import { IsEmailAlreadyInUse } from 'src/modules/user/validators/isEmailAlreadyInUse';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { MulterConfigService } from 'src/config/multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useClass: MulterConfigService
    })
  ],
  providers: [IsUsernameAlreadyInUse, IsEmailAlreadyInUse, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
