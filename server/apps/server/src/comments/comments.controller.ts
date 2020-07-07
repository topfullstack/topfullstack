import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private commentModel: ReturnModelType<typeof Comment>,
  ) {}

  @Get()
  async index(@Query('query') query: string) {
    const params = JSON.parse(query);
    return await this.commentModel
      .find()
      .populate('user')
      .where(params.where)
      .setOptions(params);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    return await this.commentModel.create(dto);
  }
}
