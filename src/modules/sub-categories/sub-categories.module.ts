import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { SubCategoriesService } from "./sub-categories.service"
import { SubCategoriesController } from "./sub-categories.controller"
import { SubCategory, SubCategorySchema } from "./entities/sub-category.schema"
import { CategoriesModule } from "../categories/categories.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
    CategoriesModule,
  ],
  providers: [SubCategoriesService],
  controllers: [SubCategoriesController],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
