import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { JobDto } from 'src/job/dto/job.dto';

export class SeniorityDto {
  @IsNotEmpty()
  @MinLength(3)
  seniorityName: string;

  @ApiHideProperty()
  job: JobDto[];
}
