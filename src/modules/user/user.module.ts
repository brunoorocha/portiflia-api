import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { IsUsernameAlreadyInUse } from 'src/modules/user/validators/isUsernameAlreadyInUse';
import { IsEmailAlreadyInUse } from 'src/modules/user/validators/isEmailAlreadyInUse';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [IsUsernameAlreadyInUse, IsEmailAlreadyInUse, UserService],
  controllers: [UserController]
})
export class UserModule {}
