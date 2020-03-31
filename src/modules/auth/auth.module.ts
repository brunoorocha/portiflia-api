import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../../models/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.APP_SECRET_KEY,
      signOptions: { expiresIn: '7 days' }
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
