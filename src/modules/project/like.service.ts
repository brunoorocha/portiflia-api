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
    if (!user) {
      throw new NotFoundException({ message: `No user found with id ${userId}` });
    }

    const project = await this.projectService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException({ message: `No user found with id ${userId}` });
    }

    const likeEntity = this.repository.create({ user, project });
    const like = await this.repository.save(likeEntity);
    return like;
  }
}
