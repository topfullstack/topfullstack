import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';

@Module({
  controllers: [EpisodesController]
})
export class EpisodesModule {}
