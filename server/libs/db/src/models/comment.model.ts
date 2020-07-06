import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { Course } from './course.model';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @prop({ ref: 'User' })
  user: Ref<User>;

  @prop({ enum: ['Course', 'Episode'] })
  type: string;

  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;

  @prop({})
  content: string;
}
