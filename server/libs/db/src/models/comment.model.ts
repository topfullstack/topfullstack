import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
import { User } from './user.model';
import { Episode } from './episode.model';

export enum ModelTypes {
  Course = 'Course',
  Episode = 'Episode',
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  @prop({ enum: [ModelTypes.Course, ModelTypes.Episode] })
  type: ModelTypes;

  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;

  @prop({ ref: 'User' })
  user: Ref<User>;

  @prop()
  content: string;

  @prop()
  sentAt: number;
}
