import { Project } from "../entities/project.entity";

export class ProjectDetailsDTO {
  constructor (
    readonly id: number,
    readonly title: string,
    readonly imageUrl: string,
    readonly likesCount: number,
    readonly description?: string,
    readonly userId?: number
  ) {}

  static fromProjectEntity (projectEntity: Project) {
    const { id, title, description, imageUrl, user, likesCount } = projectEntity;
    return new ProjectDetailsDTO(id, title, imageUrl, likesCount, description, user?.id);
  }
}
