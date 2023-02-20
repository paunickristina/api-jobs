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
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { TagDto } from './dto/tag.dto';
import RolesGuard from 'src/user/roles/roles.guard';
import Role from 'src/user/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tag')
@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Post new tag. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async createTag(@Body() tagDto: TagDto): Promise<Tag> {
    return this.tagService.create(tagDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a tag. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async updateTag(@Param('id') id: number, @Body() tagDto: TagDto) {
    const updatedTag = await this.tagService.update(id, tagDto);
    return updatedTag;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllTags(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneTag(@Param('id') id: number): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag. Role "Admin" only.' })
  @UseGuards(RolesGuard(Role.Admin))
  async deleteTag(@Param('id') id: number): Promise<DeleteResult> {
    return this.tagService.delete(id);
  }
}
