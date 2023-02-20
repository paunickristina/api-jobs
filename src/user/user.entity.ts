import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from './roles/role.enum';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiHideProperty()
  // Use Exclude to exclude password from the response
  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
