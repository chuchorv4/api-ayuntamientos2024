import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Origin } from "./entities/origin.schema"
import { CreateOriginDto } from "./dto/create-origin.dto"
import { UpdateOriginDto } from "./dto/update-origin.dto"

@Injectable()
export class OriginsService {
  constructor(@InjectModel(Origin.name) private originModel: Model<Origin>) {}

  async create(createOriginDto: CreateOriginDto): Promise<Origin> {
    const createdOrigin = new this.originModel(createOriginDto)
    return createdOrigin.save()
  }

  async findAll(): Promise<Origin[]> {
    return this.originModel.find().where("isActive").exec()
  }

  async findOne(id: string): Promise<Origin> {
    return this.originModel.findById(id).where("isActive").exec()
  }

  async update(id: string, updateOriginDto: UpdateOriginDto): Promise<Origin> {
    const existOrigin = this.originModel
      .findByIdAndUpdate(id, updateOriginDto, { new: true })
      .where("isActive")
      .exec()
    if (!existOrigin) {
      throw new NotFoundException(`Origin with ID ${id} not found`)
    }
    return existOrigin
  }

  async remove(id: string): Promise<Origin> {
    const existOrigin = this.originModel
      .findByIdAndUpdate(id, { isActive: false })
      .where("isActive")
      .exec()
    if (!existOrigin) {
      throw new NotFoundException(`Origin with ID ${id} not found`)
    }
    return existOrigin
  }
}
