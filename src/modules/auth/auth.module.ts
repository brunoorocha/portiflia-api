import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.APP_SECRET_KEY,
      signOptions: { expiresIn: '7 days' }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
