import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { JobDto } from 'src/job/dto/job.dto';

export class TagDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  tagName: string;

  @ApiHideProperty()
  jobs: JobDto[];
}