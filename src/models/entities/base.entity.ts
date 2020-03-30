import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";

export abstract class BaseEntity {
  @ObjectIdColumn()
  _id: number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
