import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';

@Module({
  controllers: [CommentsController]
})
export class CommentsModule {}
