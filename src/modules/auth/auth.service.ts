import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import { UserAuthenticationDTO } from 'src/models/dtos/user-authentication.dto';
import * as PasswordHelper from 'src/helpers/password-encrypt';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async authenticate (userAuthenticationDTO: UserAuthenticationDTO) {
    const userForUsername = await this.repository.findOne({ where: { username: userAuthenticationDTO.username }});
    if (!userForUsername) {
      throw new BadRequestException({ message: `There's no user with username ${userAuthenticationDTO.username}.` });
    }

    const isPasswordValid = PasswordHelper.isPasswordValid(userAuthenticationDTO.password, userForUsername.passwordHash, userForUsername.passwordSalt);
    if (!isPasswordValid) {
      throw new BadRequestException({ message: `Your password its wrong.` });
    }

    const token = this.getTokenForUser(userForUsername);
    return token;
  }

  getTokenForUser (user: User) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
