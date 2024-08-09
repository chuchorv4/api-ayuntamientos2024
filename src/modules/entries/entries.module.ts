import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { EntriesService } from "./entries.service"
import { EntriesController } from "./entries.controller"
import { Entry, EntrySchema } from "./entities/entry.schema"
import { SubCategoriesModule } from "../sub-categories/sub-categories.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entry.name, schema: EntrySchema }]),
    SubCategoriesModule,
  ],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
