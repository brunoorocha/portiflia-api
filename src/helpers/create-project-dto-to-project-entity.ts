import { Project } from 'src/models/entities/project.entity';
import { CreateProjectDTO } from 'src/models/dtos/create-project.dto';

export const CreateProjectDTOToProjectEntity = (createProjectDTO: CreateProjectDTO): Project => {
  const project = new Project();
  project.title = createProjectDTO.title;
  project.description = createProjectDTO.description;
  project.imageUrl = createProjectDTO.imageUrl;

  return project;
}
