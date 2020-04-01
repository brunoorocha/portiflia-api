import { Controller, Post, Res, Body, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from 'src/models/dtos/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { CreateProjectDTOToProjectEntity } from 'src/helpers/create-project-dto-to-project-entity';
import { ProjectDetailsDTO } from 'src/models/dtos/project-details.dto';

@Controller('projects')
export class ProjectController {
  constructor (
    private readonly projectService: ProjectService,
    private readonly userService: UserService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProject (@Res() res, @Request() req, @Body() createProjectDTO: CreateProjectDTO) {
    const user = await this.userService.findUserById(req.user.userId);
    const project = await this.projectService.createProject(user, createProjectDTO);
    const formattedProjectOutput = ProjectDetailsDTO.fromProjectEntity(project);
    return res.status(HttpStatus.OK).json(formattedProjectOutput);
  }
}
