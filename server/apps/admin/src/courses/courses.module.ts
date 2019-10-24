import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';

@Module({
  controllers: [CoursesController]
})
export class CoursesModule {}
