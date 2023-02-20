import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { JobDto } from './dto/job.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('job')
@ApiBearerAuth()
@Controller('job')
@UseGuards(JwtAuthGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createJob(@Body() jobDto: JobDto): Promise<Job> {
    return this.jobService.create(jobDto);
  }

  @Patch(':id')
  async updateJob(
    @Param('id', ParseUUIDPipe) id: Job['id'],
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobService.update(id, updateJobDto);
  }

  @Get()
  async findAllJobs(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Get(':id')
  async findOneJob(@Param('id') id: Job['id']): Promise<Job> {
    return this.jobService.findOne(id);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: Job['id']): Promise<DeleteResult> {
    return this.jobService.delete(id);
  }
}
