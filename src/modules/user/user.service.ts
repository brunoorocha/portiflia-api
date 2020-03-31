import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/entities/user.entity';
import { CreateUserDTO } from 'src/models/dtos/create-user.dto';
import { CreateUserDTOToUserEntity } from 'src/helpers/create-user-dto-to-entity'

@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private readonly repository: Repository<User>) {}

  async createUser (createUserDTO: CreateUserDTO): Promise<User> {
    // const isUsernameValid = await this.isUsernameAlreadyInUse(createUserDTO.username);
    const isEmailValid = await this.isEmailAlreadyInUse(createUserDTO.email);

    // if (!isUsernameValid) {
    //   throw new BadRequestException({ message: `The username ${createUserDTO.username} is already in use` });
    // }

    if (!isEmailValid) {
      throw new BadRequestException({ message: `The email ${createUserDTO.email} is already in use` });
    }

    const userEntity = CreateUserDTOToUserEntity(createUserDTO);
    const newUser = await this.repository.save(userEntity);
    return newUser;
  }

  async isUsernameAlreadyInUse (username: string): Promise<boolean> {
    const usersWithUsername = await this.repository.find({ username });
    if (usersWithUsername.length == 0) {
      return true
    }

    return false;
  }

  async isEmailAlreadyInUse (email: string): Promise<boolean> {
    const usersWithEmail = await this.repository.find({ email });
    if (usersWithEmail.length == 0) {
      return true
    }

    return false;
  }
}
