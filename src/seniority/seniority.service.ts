import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Seniority } from './seniority.entity';
import { SeniorityDto } from './dto/seniority.dto';

@Injectable()
export class SeniorityService {
  constructor(
    @InjectRepository(Seniority)
    private readonly seniorityRepository: Repository<Seniority>,
  ) {}

  async create(seniorityDto: SeniorityDto): Promise<Seniority> {
    const createdSeniority = this.seniorityRepository.create(seniorityDto);
    return this.seniorityRepository.save(createdSeniority);
  }

  async update(id: number, seniorityDto: SeniorityDto) {
    const updatedSeniority = await this.seniorityRepository
      .createQueryBuilder()
      .update(seniorityDto)
      .set({ seniorityName: seniorityDto.seniorityName })
      .where('id = :id', { id: id })
      .returning('*')
      .execute();
    return updatedSeniority.raw[0];
  }

  async findAll(): Promise<Seniority[]> {
    return this.seniorityRepository.find();
  }

  async findOne(id: number): Promise<Seniority> {
    return this.seniorityRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.seniorityRepository.delete({ id });
  }
}
