import { Entity, Column, OneToMany, RelationCount } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { Like } from './like.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 48, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 32, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 64, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  passwordHash?: string;
  
  @Column({ type: 'varchar', length: 32, nullable: true })
  passwordSalt?: string;

  @Column({ type: 'varchar', length: 48, unique: true, nullable: true })
  facebookId?: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  photoUrl?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Project, project => project.user)
  projects: Project[];

  @RelationCount((user: User) => user.projects)
  projectsCount: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Like, like => like.user)
  liked: Like[];

  @RelationCount((user: User) => user.liked)
  likedCount: number;
}