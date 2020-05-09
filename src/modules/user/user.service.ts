import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/entities/user.entity';
import { CreateUserDTO } from 'src/models/dtos/create-user.dto';
import { CreateUserEntity } from 'src/helpers/create-user-dto-to-entity'
import * as PasswordHelper from 'src/helpers/password-encrypt';
import { Project } from 'src/models/entities/project.entity';
import { Like } from 'src/models/entities/like.entity';
import { OAuthSignInDTO } from 'src/models/dtos/facebook-sigin-payload.dto';

@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private readonly repository: Repository<User>) {}

  async createUser (createUserDTO: CreateUserDTO): Promise<User> {
    const userEntity = CreateUserEntity(createUserDTO);
    const encryptedPassword = PasswordHelper.encryptPassword(createUserDTO.password);
    userEntity.passwordHash = encryptedPassword.hash;
    userEntity.passwordSalt = encryptedPassword.salt;

    const storedUser = await this.repository.save(userEntity);
    return storedUser;
  }

  async signInOrCreateUserFromSocialOAuth (oAuthSignInDTO: OAuthSignInDTO): Promise<User> {
    const { facebookId, googleId } = oAuthSignInDTO;
    const user = await this.repository.findOne({ where: [{ facebookId }, { googleId }]});

    if (user) {
      return user;
    }

    const newUser = CreateUserEntity(oAuthSignInDTO);
    const storedUser = await this.repository.save(newUser);
    return storedUser;
  }

  async findUser (userIdOrUsername: number | string): Promise<User> {
    userIdOrUsername = `${userIdOrUsername}`;
    const userId = parseInt(userIdOrUsername);
    const user = !isNaN(userId) ? 
      await this.findUserById(userId) :
      await this.findUserByUsername(userIdOrUsername);

    return user;
  }

  async findUserById (id: number, relations: string[] = []): Promise<User> {
    const user = await this.repository.findOne(id, { relations });
    if (!user) {
      throw new NotFoundException({ message: `There's no user with id ${id}.` });
    }

    return user;
  }

  async findUserByUsername (username: string, relations: string[] = []): Promise<User> {
    const user = await this.repository.findOne({ where: { username }, relations });
    if (!user) {
      throw new NotFoundException({ message: `There's no user with username ${username}.` });
    }

    return user;
  }

  async getProjectsForUser (userIdOrUsername: number | string): Promise<Project[]> {
    userIdOrUsername = `${userIdOrUsername}`;
    const userId = parseInt(userIdOrUsername);
    const user = !isNaN(userId) ? 
      await this.findUserById(userId, ['projects']) :
      await this.findUserByUsername(userIdOrUsername, ['projects']);

    return user.projects;
  }

  async getLikedProjectsForUser (userIdOrUsername: number | string): Promise<Like[]> {
    userIdOrUsername = `${userIdOrUsername}`;
    const userId = parseInt(userIdOrUsername);
    const joinQuery = {
      alias: 'user',
      leftJoinAndSelect: {
        'liked': 'user.liked',
        'project': 'liked.project',
        'projectOwner': 'project.user'
      }
    }

    const user = !isNaN(userId) ? 
      await this.repository.findOne(userId, { join: joinQuery }) :
      await this.repository.findOne({
        where: { username: userIdOrUsername },
        join: joinQuery
      });

    return user.liked;
  }

  async setPhotoUrlForUserWithId (userId: number, photoUrl: string): Promise<User> {
    const user = await this.findUserById(userId);
    user.photoUrl = photoUrl;
    const updatedUser = await this.repository.save(user);
    return updatedUser;
  }

  async isUsernameAlreadyInUse (username: string): Promise<boolean> {
    const userWithUsername = await this.repository.findOne({ where: { username }});
    return !userWithUsername;
  }

  async isEmailAlreadyInUse (email: string): Promise<boolean> {
    const userWithEmail = await this.repository.findOne({ where: { email }});
    return !userWithEmail;
  }
}
