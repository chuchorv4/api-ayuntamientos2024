import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common"
import { PagesService } from "./pages.service"
import { CreatePageDto } from "./dto/create-page.dto"
import { UpdatePageDto } from "./dto/update-page.dto"
import { Page } from "./entities/page.schema"

@Controller("pages")
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  async create(@Body() createPageDto: CreatePageDto): Promise<Page> {
    return this.pagesService.create(createPageDto)
  }

  @Get()
  async findAll(): Promise<Page[]> {
    return this.pagesService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Page> {
    return this.pagesService.findOne(id)
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePageDto: UpdatePageDto
  ): Promise<Page> {
    return this.pagesService.update(id, updatePageDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Page> {
    return this.pagesService.remove(id)
  }
}
