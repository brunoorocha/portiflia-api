import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor (@InjectRepository(User) private readonly repository: Repository<User>) {}

  async getAll (): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}
