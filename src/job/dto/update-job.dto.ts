import { PartialType } from '@nestjs/mapped-types';
import { JobDto } from './job.dto';

export class UpdateJobDto extends PartialType(JobDto) {}