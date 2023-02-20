import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Job } from 'src/job/job.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  tagName: string;

  @ApiHideProperty()
  @ManyToMany(() => Job, (jobEntity) => jobEntity.tags)
  jobs: Job[];
}