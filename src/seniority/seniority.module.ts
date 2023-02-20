import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seniority } from './seniority.entity';
import { SeniorityController } from './seniority.controller';
import { SeniorityService } from './seniority.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seniority])],
  controllers: [SeniorityController],
  providers: [SeniorityService],
})
export class SeniorityModule {}
