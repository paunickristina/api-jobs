import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { JobDto } from 'src/job/dto/job.dto';

export class TypeDto {
  @IsNotEmpty()
  @MinLength(3)
  typeName: string;

  @ApiHideProperty()
  job: JobDto[];
}
