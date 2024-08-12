import { Module } from "@nestjs/common"
import { OriginsService } from "./origins.service"
import { OriginsController } from "./origins.controller"
import { Origin, OriginSchema } from "./entities/origin.schema"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Origin.name, schema: OriginSchema }]),
  ],
  providers: [OriginsService],
  controllers: [OriginsController],
})
export class OriginsModule {}
