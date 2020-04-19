import { Entity, Column, OneToMany } from 'typeorm';
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

  @Column({ type: 'varchar', length: 1024, nullable: false })
  passwordHash: string;
  
  @Column({ type: 'varchar', length: 32, nullable: false })
  passwordSalt: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  photoUrl?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Project, project => project.user)
  projects: Project[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Like, like => like.user)
  liked: Like[];
}