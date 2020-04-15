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

  async findUserById (id: number, relations: string[] = []): Promise<User> {
    const user = await this.repository.findOne(id, { relations });
    if (!user) {
      throw new NotFoundException({ message: `There's no user with id ${id}.` });
    }

    return user;
  }

  async getProjectsForUserWithId (userId: number): Promise<Project[]> {
    const user = await this.findUserById(userId, ['projects']);
    return user.projects;
  }

  async getLikedProjectsForUserWithId (userId: number): Promise<Like[]> {
    const user = await this.findUserById(userId, ['liked']);
    return user.liked;
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
