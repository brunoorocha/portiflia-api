import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET_KEY
    });
  }

  async validate (payload: any) {
    const { username } = payload;
    const user = this.userRepository.find({ where: { username }});
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
