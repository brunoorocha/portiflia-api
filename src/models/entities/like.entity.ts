import { BaseEntity } from './base.entity';
import { ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity('likes')
export class Like extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => User, user => user.liked)
  user: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Project, project => project.likes)
  project: Project
}
