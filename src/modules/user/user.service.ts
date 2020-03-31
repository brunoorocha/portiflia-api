import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/entities/user.entity';
import { CreateUserDTO } from 'src/models/dtos/create-user.dto';
import { CreateUserDTOToUserEntity } from 'src/helpers/create-user-dto-to-entity'

@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private readonly repository: Repository<User>) {}

  async createUser (createUserDTO: CreateUserDTO): Promise<User> {
    const userEntity = CreateUserDTOToUserEntity(createUserDTO);
    const newUser = await this.repository.save(userEntity);
    return newUser;
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
