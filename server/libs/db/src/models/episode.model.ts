import { prop, modelOptions } from "@typegoose/typegoose";

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

}