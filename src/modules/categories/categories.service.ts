import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Category } from "./entities/category.schema"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto)
    return createdCategory.save()
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel
      .find()
      .populate({
        path: "subCategories",
        model: "SubCategory",
        match: { isActive: true },
        populate: {
          path: "entries",
          model: "Entry",
          match: { isActive: true },
        },
      })
      .where("isActive")
      .exec()
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel
      .findById(id)
      .populate({
        path: "subCategories",
        model: "SubCategory",
        match: { isActive: true },
        populate: {
          path: "entries",
          model: "Entry",
          match: { isActive: true },
        },
      })
      .where("isActive")
      .exec()
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return category
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const existingCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec()

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return existingCategory
  }

  async remove(id: string): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec()
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return category
  }
}
