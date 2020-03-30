import { Controller, Post, Res, Body, HttpStatus, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/models/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor (private readonly service: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser (@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const newUser = await this.service.createUser(createUserDTO);
    return res.status(HttpStatus.OK).json(newUser);
  }
}
