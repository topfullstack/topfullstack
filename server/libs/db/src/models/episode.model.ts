import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { Course } from "./course.model";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Episode {
  @prop()
  name: string

  @prop()
  file: string

  @prop({ ref: 'Course' })
  course: Ref<Course>

}