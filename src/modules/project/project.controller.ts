import { Controller, Post, Res, Body, HttpStatus, UseGuards, Request, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from 'src/models/dtos/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { ProjectDetailsDTO } from 'src/models/dtos/project-details.dto';
import { LikeService } from './like.service';
import { WsGateway } from 'src/app/gateways/ws/ws.gateway';

@Controller('projects')
export class ProjectController {
  constructor (
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly likeService: LikeService,
    private readonly wsGateway: WsGateway
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createProject (@Res() res, @Request() req, @Body() createProjectDTO: CreateProjectDTO, @UploadedFile() image) {
    const user = await this.userService.findUserById(req.user.userId);
    createProjectDTO.imageUrl = image.secure_url;

    const project = await this.projectService.createProject(user, createProjectDTO);
    const formattedProjectOutput = ProjectDetailsDTO.fromProjectEntity(project);
    return res.status(HttpStatus.OK).json(formattedProjectOutput);
  }

  @Get()
  async fetchAllProjects (@Res() res) {
    const projects = await this.projectService.fetchAllProjects();
    const formattedProjectsOutput = projects.map(project => ProjectDetailsDTO.fromProjectEntity(project));
    return res.status(HttpStatus.OK).json(formattedProjectsOutput);
  }

  @Get(':projectId')
  async getProject (@Res() res, @Param('projectId', ParseIntPipe) projectId: number) {
    const project = await this.projectService.findProjectById(projectId);
    const formattedProjectOutput = ProjectDetailsDTO.fromProjectEntity(project);
    return res.status(HttpStatus.OK).json(formattedProjectOutput);
  }

  @Delete(':projectId')
  @UseGuards(JwtAuthGuard)
  async deleteProject (
    @Res() res,
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number
  ) {
    const user = await this.userService.findUserById(req.user.userId);
    const deletedProject = await this.projectService.deleteProject(projectId, user);
    const formattedProjectOutput = ProjectDetailsDTO.fromProjectEntity(deletedProject);
    return res.status(HttpStatus.OK).json(formattedProjectOutput);
  }

  @Post(':projectId/likes')
  @UseGuards(JwtAuthGuard)
  async likeProject (
    @Res() res,
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number
  ) {
    const { userId } = req.user;
    const like = await this.likeService.like(userId, projectId);
    this.wsGateway.ws.emit(`notifications:user:${userId}`, { message: `${like.user.username} liked your project.` });
    return res.status(HttpStatus.OK).json({});
  }

  @Delete(':projectId/likes')
  @UseGuards(JwtAuthGuard)
  async unlikeProject (
    @Res() res,
    @Request() req,
    @Param('projectId', ParseIntPipe) projectId: number
  ) {
    const { userId } = req.user;
    await this.likeService.unlike(userId, projectId);
    return res.status(HttpStatus.OK).json({});
  }
}
