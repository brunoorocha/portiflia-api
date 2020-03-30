import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 48, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 32, unique: true, nullable: false })
  username: string

  @Column({ type: 'varchar', length: 32, unique: true, nullable: false })
  email: string

  @Column({ type: 'varchar', length: 256, nullable: false })
  password: string
}