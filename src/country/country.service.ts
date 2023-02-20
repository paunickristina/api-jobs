import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Country } from './country.entity';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(countryDto: CountryDto): Promise<Country> {
    const createdCountry = this.countryRepository.create(countryDto);
    return this.countryRepository.save(createdCountry);
  }

  async update(id: number, countryDto: CountryDto) {
    const updatedCountry = await this.countryRepository
      .createQueryBuilder()
      .update(countryDto)
      .set({ countryName: countryDto.countryName })
      .where('id = :id', { id: id })
      .returning('*')
      .execute();
    return updatedCountry.raw[0];
  }

  async findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  async findOne(id: number): Promise<Country> {
    return this.countryRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.countryRepository.delete({ id });
  }
}
