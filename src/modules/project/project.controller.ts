import { Controller, Post, Res, Body, HttpStatus, UseGuards, Request, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from 'src/models/dtos/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { ProjectDetailsDTO } from 'src/models/dtos/project-details.dto';
import { getImageUrl } from 'src/helpers/getImageUrl';

@Controller('projects')
export class ProjectController {
  constructor (
    private readonly projectService: ProjectService,
    private readonly userService: UserService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createProject (@Res() res, @Request() req, @Body() createProjectDTO: CreateProjectDTO, @UploadedFile() image) {
    const user = await this.userService.findUserById(req.user.userId);
    createProjectDTO.imageUrl = getImageUrl(req, image.filename);
    const project = await this.projectService.createProject(user, createProjectDTO);
    const formattedProjectOutput = ProjectDetailsDTO.fromProjectEntity(project);
    return res.status(HttpStatus.OK).json(formattedProjectOutput);
  }

  @Get(':projectId')
  async getProject (@Res() res, @Param('projectId', ParseIntPipe) projectId: number) {
    const project = await this.projectService.findProjectById(projectId);
    const formattedProjectOutput = ProjectDetailsDTO.fromProjectEntity(project);
    return res.status(HttpStatus.OK).json(formattedProjectOutput);
  }
}
