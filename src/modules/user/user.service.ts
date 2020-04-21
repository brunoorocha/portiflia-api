import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/entities/user.entity';
import { CreateUserDTO } from 'src/models/dtos/create-user.dto';
import { CreateUserDTOToUserEntity } from 'src/helpers/create-user-dto-to-entity'
import * as PasswordHelper from 'src/helpers/password-encrypt';
import { Project } from 'src/models/entities/project.entity';
import { Like } from 'src/models/entities/like.entity';

@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private readonly repository: Repository<User>) {}

  async createUser (createUserDTO: CreateUserDTO): Promise<User> {
    const userEntity = CreateUserDTOToUserEntity(createUserDTO);
    const encryptedPassword = PasswordHelper.encryptPassword(createUserDTO.password);
    userEntity.passwordHash = encryptedPassword.hash;
    userEntity.passwordSalt = encryptedPassword.salt;

    const storedUser = await this.repository.save(userEntity);
    return storedUser;
  }

  async findUser (userIdOrUsername: string): Promise<User> {
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

  async getProjectsForUser (userIdOrUsername: string): Promise<Project[]> {
    const userId = parseInt(userIdOrUsername);
    const user = !isNaN(userId) ? 
      await this.findUserById(userId, ['projects']) :
      await this.findUserByUsername(userIdOrUsername, ['projects']);

    return user.projects;
  }

  async getLikedProjectsForUserWithId (userId: number): Promise<Like[]> {
    const user = await this.findUserById(userId, ['liked']);
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
