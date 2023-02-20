import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Location } from './location.entity';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(locationDto: LocationDto): Promise<Location> {
    const createdLocation = this.locationRepository.create(locationDto);
    const { id } = await this.locationRepository.save(createdLocation);
    return this.findOne(id);
  }

  async update(id: number, locationDto: LocationDto) {
    await this.locationRepository
      .createQueryBuilder()
      .update(locationDto)
      .set({ city: locationDto.city, country: locationDto.country })
      .where('id = :id', { id: id })
      .returning('*')
      .execute();
    return this.findOne(id);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async findOne(id: number): Promise<Location> {
    return this.locationRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.locationRepository.delete({ id });
  }
}
