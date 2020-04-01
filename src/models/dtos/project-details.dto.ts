import { Project } from "../entities/project.entity";

export class ProjectDetailsDTO {
  constructor (
    readonly id: number,
    readonly title: string,
    readonly userId: number,
    readonly description?: string,
    readonly imageUrl?: string
  ) {}

  static fromProjectEntity (projectEntity: Project) {
    const { id, title, description, imageUrl, user } = projectEntity;
    return new ProjectDetailsDTO(id, title, user.id, description, imageUrl);
  }
}
