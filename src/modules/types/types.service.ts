import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { CreateTypeDto } from "./dto/create-type.dto"
import { Type } from "./entities/type.schema"
import { UpdateTypeDto } from "./dto/update-type.dto"

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const createdType = new this.typeModel(createTypeDto)
    return createdType.save()
  }

  async findAll(): Promise<Type[]> {
    return this.typeModel.find().where("isActive").exec()
  }

  async findOne(id: string): Promise<Type> {
    const existType = this.typeModel.findById(id).where("isActive").exec()
    if (!existType) {
      throw new NotFoundException(`Type with ID ${id} not found`)
    }
    return existType
  }

  async update(id: string, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const existingType = await this.typeModel
      .findByIdAndUpdate(id, updateTypeDto, { new: true })
      .exec()

    if (!existingType) {
      throw new NotFoundException(`Entry with ID ${id} not found`)
    }
    return existingType
  }

  async remove(id: string): Promise<Type> {
    const type = this.typeModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec()
    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`)
    }
    return type
  }
}
