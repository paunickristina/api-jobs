import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { LocationDto } from 'src/location/dto/location.dto';

export class CountryDto {
  @IsNotEmpty()
  @MinLength(3)
  countryName: string;

  @ApiHideProperty()
  location: LocationDto[];
}
