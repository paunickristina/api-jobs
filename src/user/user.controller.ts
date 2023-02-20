import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import RolesGuard from './roles/roles.guard';
import Role from './roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // check update user operation:
  // @Patch(':id')
  // async updateUser(@Param('id') id: number, @Body() updateJobDto: UpdateUserDto) {
  //   return this.userService.update(id, updateJobDto);
  // }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async findOneUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
