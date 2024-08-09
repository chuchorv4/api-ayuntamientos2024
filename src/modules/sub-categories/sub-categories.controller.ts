import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common"
import { SubCategoriesService } from "./sub-categories.service"
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto"
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto"
import { SubCategory } from "./entities/sub-category.schema"

@Controller("sub-categories")
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  async create(
    @Body() createSubCategoryDto: CreateSubCategoryDto
  ): Promise<SubCategory> {
    return this.subCategoriesService.create(createSubCategoryDto)
  }

  @Get()
  async findAll(): Promise<SubCategory[]> {
    return this.subCategoriesService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<SubCategory> {
    return this.subCategoriesService.findOne(id)
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto
  ): Promise<SubCategory> {
    return this.subCategoriesService.update(id, updateSubCategoryDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<SubCategory> {
    return this.subCategoriesService.remove(id)
  }
}
