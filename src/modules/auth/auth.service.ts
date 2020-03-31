import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import { UserAuthenticationDTO } from 'src/models/dtos/user-authentication.dto';
import { UserDetailsDTO } from 'src/models/dtos/user-details.dto';
import * as PasswordHelper from 'src/helpers/password-encrypt';

@Injectable()
export class AuthService {
  constructor (@InjectRepository(User) private readonly repository: Repository<User>) {}

  async authenticate (userAuthenticationDTO: UserAuthenticationDTO): Promise<UserDetailsDTO> {
    const userForUsername = await this.repository.findOne({ where: { username: userAuthenticationDTO.username }});
    if (!userForUsername) {
      throw new BadRequestException({ message: `There's no user with username ${userAuthenticationDTO.username}.` });
    }

    const isPasswordValid = PasswordHelper.isPasswordValid(userAuthenticationDTO.password, userForUsername.passwordHash, userForUsername.passwordSalt)
    if (isPasswordValid) {
      throw new BadRequestException({ message: `Your password its wrong.` });
    }

    return UserDetailsDTO.fromUserEntity(userForUsername);
  }
}
