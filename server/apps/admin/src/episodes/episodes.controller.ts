import { Controller, Get } from '@nestjs/common';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
  model: Episode
})
@Controller('episodes')
@ApiUseTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>
  ) { }

  @Get('option')
  option(){
    return {
      title: "课时管理",
      column: [
        { prop: "name", label: "课时名称" },
        // { prop: "cover", label: "课程封面图" }
      ]
    }
  }
}
