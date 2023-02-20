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
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { LocationDto } from './dto/location.dto';
import RolesGuard from 'src/user/roles/roles.guard';
import Role from 'src/user/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('location')
@ApiBearerAuth()
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Post new location. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async createLocation(@Body() locationDto: LocationDto): Promise<Location> {
    return this.locationService.create(locationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a location. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async updateLocation(
    @Param('id') id: number,
    @Body() locationDto: LocationDto,
  ) {
    const updatedLocation = await this.locationService.update(id, locationDto);
    return updatedLocation;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllLocations(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneLocation(@Param('id') id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async deleteLocation(@Param('id') id: number): Promise<DeleteResult> {
    return this.locationService.delete(id);
  }
}
