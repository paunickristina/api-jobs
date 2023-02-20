import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from 'src/job/job.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Type {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 25,
  })
  typeName: string;

  @ApiHideProperty()
  @OneToMany(() => Job, (jobEntity) => jobEntity.type)
  job: Job[];
}
