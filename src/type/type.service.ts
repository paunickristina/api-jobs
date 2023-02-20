import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Type } from './type.entity';
import { TypeDto } from './dto/type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type) private readonly typeRepository: Repository<Type>,
  ) {}

  async create(typeDto: TypeDto): Promise<Type> {
    const createdType = this.typeRepository.create(typeDto);
    return this.typeRepository.save(createdType);
  }

  async update(id: number, typeDto: TypeDto) {
    const updatedType = await this.typeRepository
      .createQueryBuilder()
      .update(typeDto)
      .set({ typeName: typeDto.typeName })
      .where('id = :id', { id: id })
      .returning('*')
      .execute();
    return updatedType.raw[0];
  }

  async findAll(): Promise<Type[]> {
    return this.typeRepository.find();
  }

  async findOne(id: number): Promise<Type> {
    return this.typeRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.typeRepository.delete({ id });
  }
}
