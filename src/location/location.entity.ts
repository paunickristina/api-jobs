import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Job } from 'src/job/job.entity';
import { Country } from 'src/country/country.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Location {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @ApiHideProperty()
  @OneToMany(() => Job, (jobEntity) => jobEntity.location)
  job: Job[];

  @ManyToOne(() => Country, (countryEntity) => countryEntity.location, {
    eager: true,
  })
  @JoinColumn()
  country: Country;
}
