import { Project } from "../entities/project.entity";

export class ProjectDetailsDTO {
  constructor (
    readonly id: number,
    readonly title: string,
    readonly description?: string,
    readonly imageUrl?: string,
    readonly userId?: number
  ) {}

  static fromProjectEntity (projectEntity: Project) {
    const { id, title, description, imageUrl, user } = projectEntity;
    return new ProjectDetailsDTO(id, title, description, imageUrl, user?.id);
  }
}
