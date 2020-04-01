import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findProjectById (projectId: number): Promise<Project> {
    const project = await this.repository.findOne(projectId);
    if (!project) {
      throw new NotFoundException({ message: `There's no project with id ${projectId}` });
    }

    return project;
  }

  async deleteProject (projectId: number): Promise<Project> {
    const project = await this.findProjectById(projectId);
    await this.repository.delete({ id: projectId });
    return project;
  }
}
