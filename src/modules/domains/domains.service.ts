import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Domain } from "./entities/domain.schema"
import { CreateDomainDto } from "./dto/create-domain.dto"
import { UpdateDomainDto } from "./dto/update-domain.dto"

@Injectable()
export class DomainsService {
  constructor(@InjectModel(Domain.name) private domainModel: Model<Domain>) {}

  async create(createDomainDto: CreateDomainDto): Promise<Domain> {
    const createdDomain = new this.domainModel(createDomainDto)
    return createdDomain.save()
  }

  async findAll(): Promise<Domain[]> {
    return this.domainModel.find().where("isActive").exec()
  }

  async findOne(id: string): Promise<Domain> {
    const domain = await this.domainModel.findById(id).where("isActive").exec()
    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`)
    }
    return domain
  }

  async update(id: string, updateDomainDto: UpdateDomainDto): Promise<Domain> {
    const existingDomain = await this.domainModel
      .findByIdAndUpdate(id, updateDomainDto, { new: true })
      .exec()

    if (!existingDomain) {
      throw new NotFoundException(`Domain with ID ${id} not found`)
    }
    return existingDomain
  }

  async remove(id: string): Promise<Domain> {
    const domain = this.domainModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec()
    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`)
    }
    return domain
  }
}
