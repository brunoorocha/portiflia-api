import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../../models/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { GoogleStrategy } from './strategies/google.strategy';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.APP_SECRET_KEY,
      signOptions: { expiresIn: '7 days' }
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, FacebookStrategy, GoogleStrategy, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
