import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from 'src/job/job.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Seniority {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 25,
  })
  seniorityName: string;

  @ApiHideProperty()
  @OneToMany(() => Job, (jobEntity) => jobEntity.seniority)
  job: Job[];
}
