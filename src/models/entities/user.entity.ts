import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 48 })
  name: string

  @Column({ type: 'varchar', length: 32, unique: true })
  username: string

  @Column({ type: 'varchar', length: 32, unique: true })
  email: string

  @Column({ type: 'varchar', length: 256 })
  password: string
}