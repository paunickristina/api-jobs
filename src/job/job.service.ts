import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Job } from './job.entity';
import { JobDto } from './dto/job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  async create(jobDto: JobDto) {
    const job = this.jobRepository.create(jobDto);
    return this.jobRepository.save(job);
  }

  async update(id: Job['id'], updateJobDto: UpdateJobDto) {
    const job = await this.jobRepository.preload({
      id: id,
      ...updateJobDto,
    });
    if (!job) {
      throw new NotFoundException(`Job with id #${id} not found`);
    }
    return this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findOne(id: Job['id']): Promise<Job> {
    return this.jobRepository.findOneBy({ id });
  }

  async delete(id: Job['id']): Promise<DeleteResult> {
    return this.jobRepository.delete({ id });
  }
}
