import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common"
import { ContactsService } from "./contacts.service"
import { CreateContactDto } from "./dto/create-contact.dto"
import { UpdateContactDto } from "./dto/update-contact.dto"
import { Contact } from "./entities/contact.schema"

@Controller("contacts")
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto)
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactsService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Contact> {
    return this.contactsService.findOne(id)
  }

  @Get("page/:id")
  async getByPage(@Param("id") id: string): Promise<Contact[]> {
    return this.contactsService.getByPage(id)
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateContactDto: UpdateContactDto
  ): Promise<Contact> {
    return this.contactsService.update(id, updateContactDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Contact> {
    return this.contactsService.remove(id)
  }
}
