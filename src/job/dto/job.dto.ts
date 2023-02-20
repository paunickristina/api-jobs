import { IsNotEmpty, MinLength } from 'class-validator';
import { SeniorityDto } from 'src/seniority/dto/seniority.dto';
import { TypeDto } from 'src/type/dto/type.dto';
import { LocationDto } from 'src/location/dto/location.dto';
import { TagDto } from 'src/tag/dto/tag.dto';

export class JobDto {
  @IsNotEmpty()
  @MinLength(3)
  jobName: string;

  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  @MinLength(3)
  requirements: string;

  @IsNotEmpty()
  @MinLength(3)
  contact: string;

  @IsNotEmpty()
  numOfPos: number;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  scheduled: boolean;

  @IsNotEmpty()
  published: boolean;

  @IsNotEmpty()
  ended: boolean;

  seniority: SeniorityDto;

  type: TypeDto;

  location: LocationDto;

  tags: TagDto[];
}
