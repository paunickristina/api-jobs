import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SeniorityService } from './seniority.service';
import { Seniority } from './seniority.entity';
import { SeniorityDto } from './dto/seniority.dto';
import { DeleteResult } from 'typeorm';
import RolesGuard from 'src/user/roles/roles.guard';
import Role from 'src/user/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('seniority')
@ApiBearerAuth()
@Controller('seniority')
export class SeniorityController {
  constructor(private readonly seniorityService: SeniorityService) {}

  @Post()
  @ApiOperation({ summary: 'Post new seniority. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async createSeniority(
    @Body() seniorityDto: SeniorityDto,
  ): Promise<Seniority> {
    return this.seniorityService.create(seniorityDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a seniority. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async updateSeniority(
    @Param('id') id: number,
    @Body() seniorityDto: SeniorityDto,
  ) {
    const updatedSeniority = await this.seniorityService.update(
      id,
      seniorityDto,
    );
    return updatedSeniority;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllSeniorities(): Promise<Seniority[]> {
    return this.seniorityService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneSeniority(@Param('id') id: number): Promise<Seniority> {
    return this.seniorityService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a seniority. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async deleteSeniority(@Param('id') id: number): Promise<DeleteResult> {
    return this.seniorityService.delete(id);
  }
}
