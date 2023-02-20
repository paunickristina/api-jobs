import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(tagDto: TagDto): Promise<Tag> {
    const createdTag = this.tagRepository.create(tagDto);
    return this.tagRepository.save(createdTag);
  }

  async update(id: number, tagDto: TagDto) {
    const updatedTag = await this.tagRepository
      .createQueryBuilder()
      .update(tagDto)
      .set({ tagName: tagDto.tagName })
      .where('id = :id', { id: id })
      .returning('*')
      .execute();
    return updatedTag.raw[0];
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.tagRepository.delete({ id });
  }
}
