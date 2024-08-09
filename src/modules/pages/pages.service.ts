import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Page } from "./entities/page.schema"
import { CreatePageDto } from "./dto/create-page.dto"
import { UpdatePageDto } from "./dto/update-page.dto"

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const createdPage = new this.pageModel(createPageDto)
    return createdPage.save()
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.where("isActive").populate("domain").exec()
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.pageModel
      .findById(id)
      .where("isActive")
      .populate("domain")
      .exec()
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`)
    }
    return page
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const existingPage = await this.pageModel
      .findByIdAndUpdate(id, updatePageDto, { new: true })
      .exec()
    if (!existingPage) {
      throw new NotFoundException(`Page with ID ${id} not found`)
    }
    return existingPage
  }

  async remove(id: string): Promise<Page> {
    const page = await this.pageModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec()
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`)
    }
    return page
  }
}
