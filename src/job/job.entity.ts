import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Seniority } from 'src/seniority/seniority.entity';
import { Type } from 'src/type/type.entity';
import { Location } from 'src/location/location.entity';
import { Tag } from 'src/tag/tag.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  jobName: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'text',
  })
  requirements: string;

  @Column({
    type: 'text',
  })
  contact: string;

  @Column({
    type: 'int',
  })
  numOfPos: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
  })
  endDate: Date;

  @Column({
    type: 'boolean',
  })
  scheduled: boolean;

  @Column({
    type: 'boolean',
  })
  published: boolean;

  @Column({
    type: 'boolean',
  })
  ended: boolean;

  @ManyToOne(() => Seniority, (seniorityEntity) => seniorityEntity.job, {
    eager: true,
  })
  @JoinColumn()
  seniority: Seniority;

  @ManyToOne(() => Type, (typeEntity) => typeEntity.job, {
    eager: true,
  })
  @JoinColumn()
  type: Type;

  @ManyToOne(() => Location, (locationEntity) => locationEntity.job, {
    eager: true,
  })
  @JoinColumn()
  location: Location;

  @ManyToMany(() => Tag, (tagEntity) => tagEntity.jobs, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];
}
