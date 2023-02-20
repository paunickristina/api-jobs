import { IsNotEmpty, MinLength } from 'class-validator';
import { JobDto } from 'src/job/dto/job.dto';
import { CountryDto } from 'src/country/dto/country.dto';
import { ApiHideProperty } from '@nestjs/swagger';

export class LocationDto {
  @IsNotEmpty()
  @MinLength(3)
  city: string;

  @ApiHideProperty()
  job: JobDto[];

  // check this, should be an id in api docs?
  country: CountryDto;
}
