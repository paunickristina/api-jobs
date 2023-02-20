import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = this.userRepository.create(userDto);
    return this.userRepository.save(createdUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }
}
