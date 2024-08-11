import { Controller, Get, Post, Body, Put, Delete } from "@nestjs/common"
import { TypesService } from "./types.service"
import { CreateTypeDto } from "./dto/create-type.dto"
import { Type } from "./entities/type.schema"
import { UpdateTypeDto } from "./dto/update-type.dto"

@Controller("types")
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return this.typesService.create(createTypeDto)
  }

  @Get()
  async findAll(): Promise<Type[]> {
    return this.typesService.findAll()
  }

  @Get(":id")
  async findOne(id: string): Promise<Type> {
    return this.typesService.findOne(id)
  }

  @Put(":id")
  async update(
    @Body() updateTypeDto: UpdateTypeDto,
    @Body("id") id: string
  ): Promise<Type> {
    return this.typesService.update(id, updateTypeDto)
  }

  @Delete(":id")
  async remove(@Body("id") id: string): Promise<Type> {
    return this.typesService.remove(id)
  }
}
