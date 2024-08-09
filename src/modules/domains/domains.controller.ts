import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common"
import { DomainsService } from "./domains.service"
import { CreateDomainDto } from "./dto/create-domain.dto"
import { UpdateDomainDto } from "./dto/update-domain.dto"
import { Domain } from "./entities/domain.schema"

@Controller("domains")
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Post()
  async create(@Body() createDomainDto: CreateDomainDto): Promise<Domain> {
    return this.domainsService.create(createDomainDto)
  }

  @Get()
  async findAll(): Promise<Domain[]> {
    return this.domainsService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Domain> {
    return this.domainsService.findOne(id)
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDomainDto: UpdateDomainDto
  ): Promise<Domain> {
    return this.domainsService.update(id, updateDomainDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Domain> {
    return this.domainsService.remove(id)
  }
}
