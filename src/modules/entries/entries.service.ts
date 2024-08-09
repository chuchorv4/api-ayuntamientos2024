import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Entry } from "./entities/entry.schema"
import { CreateEntryDto } from "./dto/create-entry.dto"
import { UpdateEntryDto } from "./dto/update-entry.dto"
import { SubCategoriesService } from "../sub-categories/sub-categories.service"

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<Entry>,
    private subCategoryService: SubCategoriesService
  ) {}

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const createdEntry = new this.entryModel(createEntryDto)

    const subCategory = await this.subCategoryService.findOne(
      createEntryDto.subCategory
    )

    if (!subCategory) {
      throw new NotFoundException(
        `SubCategory with ID ${createEntryDto.subCategory} not found`
      )
    }
    await this.subCategoryService.update(createEntryDto.subCategory, {
      entries: [...subCategory.entries, createdEntry.id],
    })
    return createdEntry.save()
  }

  async findAll(): Promise<Entry[]> {
    return this.entryModel.find().where("isActive").exec()
  }

  async findOne(id: string): Promise<Entry> {
    const entry = await this.entryModel.findById(id).where("isActive").exec()
    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`)
    }
    return entry
  }

  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const existingEntry = await this.entryModel
      .findByIdAndUpdate(id, updateEntryDto, { new: true })
      .exec()

    if (!existingEntry) {
      throw new NotFoundException(`Entry with ID ${id} not found`)
    }
    return existingEntry
  }

  async remove(id: string): Promise<Entry> {
    const entry = this.entryModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec()
    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`)
    }
    return entry
  }
}
