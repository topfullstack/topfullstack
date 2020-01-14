import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Comment } from '@libs/db/models/comment.model';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { CreatedByInterceptor } from '../auth/created-by.interceptor';

@Crud({
  model: Comment,

  routes: {
    create: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        UseInterceptors(CreatedByInterceptor),
      ],
    },
  },
})
@Controller('comments')
export class CommentsController {
  constructor(@InjectModel(Comment) private model) {}
}
