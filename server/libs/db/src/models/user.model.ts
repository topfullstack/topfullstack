import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiModelProperty } from '@nestjs/swagger'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @ApiModelProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string

  @ApiModelProperty({ description: '密码', example: 'pass1' })
  @prop()
  password: string
}