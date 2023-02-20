import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Location } from 'src/location/location.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Country {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  countryName: string;

  @ApiHideProperty()
  @OneToMany(() => Location, (locationEntity) => locationEntity.country)
  location: Location[];
}
