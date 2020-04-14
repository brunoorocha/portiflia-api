import { Controller, Post, Res, Body, HttpStatus, ValidationPipe, UsePipes, Get, Req, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/models/dtos/create-user.dto';
import { UserDetailsDTO } from 'src/models/dtos/user-details.dto';
import { ProjectDetailsDTO } from 'src/models/dtos/project-details.dto';

@Controller('users')
export class UserController {
  constructor (private readonly service: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser (@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.service.createUser(createUserDTO);
    const formattedUserOutput = UserDetailsDTO.fromUserEntity(user);
    return res.status(HttpStatus.OK).json(formattedUserOutput);
  }

  @Get(':userId')
  async getProfile (@Res() res, @Param('userId', ParseIntPipe) userId: number) {
    const user = await this.service.findUserById(userId);
    const formattedUserOutput = UserDetailsDTO.fromUserEntity(user);
    return res.status(HttpStatus.OK).json(formattedUserOutput);
  }

  @Get(':userId/projects')
  async getProjects (@Res() res, @Param('userId', ParseIntPipe) userId: number) {
    const projects = await this.service.getProjectsForUserWithId(userId);
    const formattedProjectsOutput = projects.map(project => ProjectDetailsDTO.fromProjectEntity(project));
    return res.status(HttpStatus.OK).json(formattedProjectsOutput);
  }
}
