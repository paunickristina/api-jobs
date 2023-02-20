import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TypeService } from './type.service';
import { Type } from './type.entity';
import { TypeDto } from './dto/type.dto';
import RolesGuard from 'src/user/roles/roles.guard';
import Role from 'src/user/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('type')
@ApiBearerAuth()
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @ApiOperation({ summary: 'Post new type. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async createType(@Body() typeDto: TypeDto): Promise<Type> {
    return this.typeService.create(typeDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a type. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async updateType(@Param('id') id: number, @Body() typeDto: TypeDto) {
    const updatedType = await this.typeService.update(id, typeDto);
    return updatedType;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllTypes(): Promise<Type[]> {
    return this.typeService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneType(@Param('id') id: number): Promise<Type> {
    return this.typeService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a type. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async deleteType(@Param('id') id: number): Promise<DeleteResult> {
    return this.typeService.delete(id);
  }
}
