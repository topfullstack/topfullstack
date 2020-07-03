import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('actions')
export class ActionsController {
  constructor(
    @InjectModel(Action) private actionModel: ReturnModelType<typeof Action>,
  ) {}

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto, @CurrentUser() user) {
    dto.user = user._id
    const count = await this.actionModel.countDocuments(dto)
    return {
      status: count > 0
    }
  }

  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async toggle(@Body() dto, @CurrentUser() user) {
    dto.user = user._id
    const ret = await this.getStatus(dto, user)
    if (ret.status) {
      await this.actionModel.deleteMany(dto)
    } else {
      await this.actionModel.create(dto)
    }
    return await this.getStatus(dto, user)
  }
}
