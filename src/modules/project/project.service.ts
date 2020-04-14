import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/models/entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/models/entities/user.entity';
import { CreateProjectDTO } from 'src/models/dtos/create-project.dto';
import { CreateProjectDTOToProjectEntity } from 'src/helpers/create-project-dto-to-project-entity';

@Injectable()
export class ProjectService {
  constructor (@InjectRepository(Project) private readonly repository: Repository<Project>) {}

  async createProject (owner: User, createProjecDTO: CreateProjectDTO): Promise<Project> {
    const projectEntity = CreateProjectDTOToProjectEntity(createProjecDTO);
    projectEntity.user = owner;
    const storedProject = await this.repository.save(projectEntity);
    return storedProject;
  }

  async fetchAllProjects (): Promise<Project[]> {
    const projects = await this.repository.find({ relations: ['user'] });
    return projects;
  }

  async findProjectById (projectId: number, relations: string[] = []): Promise<Project> {
    const project = await this.repository.findOne(projectId, { relations });
    if (!project) {
      throw new NotFoundException({ message: `There's no project with id ${projectId}` });
    }

    return project;
  }

  async deleteProject (projectId: number, user: User): Promise<Project> {
    const project = await this.findProjectById(projectId, ['user']);
    if (!this.projectBelongsToUser(project, user)) {
      throw new UnauthorizedException({ message: `You can\'t delete this project because it doesn\'t belongs to user ${user.username}.` });
    }

    await this.repository.delete({ id: projectId });
    return project;
  }

  private projectBelongsToUser (project: Project, user: User): boolean {
    return project.user.id === user.id;
  }
}
