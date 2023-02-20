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
import { CountryService } from './country.service';
import { Country } from './country.entity';
import { CountryDto } from './dto/country.dto';
import RolesGuard from 'src/user/roles/roles.guard';
import Role from 'src/user/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('country')
@ApiBearerAuth()
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({ summary: 'Post new country. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async createCountry(@Body() countryDto: CountryDto): Promise<Country> {
    return this.countryService.create(countryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a country. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async updateCountry(@Param('id') id: number, @Body() countryDto: CountryDto) {
    const updatedCountry = await this.countryService.update(id, countryDto);
    return updatedCountry;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllCountries(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneCountry(@Param('id') id: number): Promise<Country> {
    return this.countryService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async deleteCountry(@Param('id') id: number): Promise<DeleteResult> {
    return this.countryService.delete(id);
  }
}
