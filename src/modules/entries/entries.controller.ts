import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common"
import { EntriesService } from "./entries.service"
import { Entry } from "./entities/entry.schema"
import { CreateEntryDto } from "./dto/create-entry.dto"
import { UpdateEntryDto } from "./dto/update-entry.dto"

@Controller("entries")
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  async createEntry(@Body() entryDto: CreateEntryDto): Promise<Entry> {
    return this.entriesService.create(entryDto)
  }

  @Get()
  async getAllEntries(): Promise<Entry[]> {
    return this.entriesService.findAll()
  }

  @Get(":id")
  async getEntryById(@Param("id") id: string): Promise<Entry> {
    return this.entriesService.findOne(id)
  }

  @Put(":id")
  async updateEntry(
    @Param("id") id: string,
    @Body() entryDto: UpdateEntryDto
  ): Promise<Entry> {
    return this.entriesService.update(id, entryDto)
  }

  @Delete(":id")
  async deleteEntry(@Param("id") id: string): Promise<Entry> {
    return this.entriesService.remove(id)
  }
}
