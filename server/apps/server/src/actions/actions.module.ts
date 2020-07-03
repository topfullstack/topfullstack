import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';

@Module({
  controllers: [ActionsController]
})
export class ActionsModule {}
