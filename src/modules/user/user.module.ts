import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { IsUsernameAlreadyInUse } from 'src/modules/user/validators/isUsernameAlreadyInUse';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [IsUsernameAlreadyInUse, UserService],
  controllers: [UserController]
})
export class UserModule {}
