import { Controller, Post, Res, Body, HttpStatus, ValidationPipe, UsePipes, Get, Param, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/models/dtos/create-user.dto';
import { UserDetailsDTO } from 'src/models/dtos/user-details.dto';
import { ProjectDetailsDTO } from 'src/models/dtos/project-details.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/helpers/decorators/user.decorator';
import { User as UserEntity } from 'src/models/entities/user.entity';

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

  @Get(':userIdOrUsername')
  async getProfile (@Res() res, @Param('userIdOrUsername') userIdOrUsername: string) {
    const user = await this.service.findUser(userIdOrUsername);
    const formattedUserOutput = UserDetailsDTO.fromUserEntity(user);
    return res.status(HttpStatus.OK).json(formattedUserOutput);
  }

  @Get(':userIdOrUsername/projects')
  async getProjects (@Res() res, @Param('userIdOrUsername') userIdOrUsername: string) {
    const projects = await this.service.getProjectsForUser(userIdOrUsername);
    const formattedProjectsOutput = projects.map(project => ProjectDetailsDTO.fromProjectEntity(project));
    return res.status(HttpStatus.OK).json(formattedProjectsOutput);
  }

  @Put(':userId/profile-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profileImage'))
  async updateUserProfileImage (
    @Res() res,
    @UploadedFile() profileImage,
    @User() user: UserEntity
  ) {
    const { photoUrl } = await this.service.setPhotoUrlForUserWithId(user.id, profileImage.secure_url);
    return res.status(HttpStatus.OK).json({ photoUrl })
  }
}
