import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SubCategory } from "./entities/sub-category.schema"
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto"
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto"
import { CategoriesService } from "../categories/categories.service"

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
    private categoryService: CategoriesService
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto
  ): Promise<SubCategory> {
    const createdSubCategory = new this.subCategoryModel(createSubCategoryDto)
    const category = await this.categoryService.findOne(
      createSubCategoryDto.category
    )
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createSubCategoryDto.category} not found`
      )
    }
    await this.categoryService.update(category.id, {
      subCategories: [...category.subCategories, createdSubCategory.id],
    })

    return createdSubCategory.save()
  }

  async findAll(): Promise<SubCategory[]> {
    return this.subCategoryModel.find().exec()
  }

  async findOne(id: string): Promise<SubCategory> {
    const subCategory = await this.subCategoryModel
      .findById(id)
      .where("isActive")
      .exec()
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`)
    }
    return subCategory
  }

  async update(
    id: string,
    updateSubCategoryDto: UpdateSubCategoryDto
  ): Promise<SubCategory> {
    const existingSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, updateSubCategoryDto, { new: true })
      .where("isActive")
      .exec()

    if (!existingSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`)
    }
    return existingSubCategory
  }

  async remove(id: string): Promise<SubCategory> {
    const subCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec()
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`)
    }
    return subCategory
  }
}
