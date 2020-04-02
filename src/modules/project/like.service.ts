import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Like } from "src/models/entities/like.entity";
import { UserService } from "../user/user.service";
import { ProjectService } from "./project.service";

@Injectable()
export class LikeService {
  constructor (
    @InjectRepository(Like) private readonly repository: Repository<Like>,
    private readonly userService: UserService,
    private readonly projectService: ProjectService
  ) {}

  async like (userId: number, projectId: number): Promise<Like> {
    const user = await this.userService.findUserById(userId);
    const project = await this.projectService.findProjectById(projectId);
    const like = await this.repository.findOne({ user, project });

    if(!like) {
      const likeEntity = this.repository.create({ user, project });
      return await this.repository.save(likeEntity);
    }

    return like;
  }

  async unlike (userId: number, projectId: number): Promise<Like> {
    const user = await this.userService.findUserById(userId);
    const project = await this.projectService.findProjectById(projectId);
    const like = await this.repository.findOne({ user, project });

    if (!like) {
      throw new NotFoundException({ message: `The user ${user.username} didn't liked the project with id ${project.id}` });
    }

    await this.repository.delete({ user, project });
    return like;
  }
}
