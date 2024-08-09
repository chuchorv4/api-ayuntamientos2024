import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Contact } from "./entities/contact.schema"
import { CreateContactDto } from "./dto/create-contact.dto"
import { UpdateContactDto } from "./dto/update-contact.dto"

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto)
    return createdContact.save()
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().where("isActive").exec()
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel
      .findById(id)
      .where("isActive")
      .exec()
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`)
    }
    return contact
  }

  async getByPage(id: string): Promise<Contact[]> {
    return this.contactModel
      .find({
        page: id,
      })
      .where("isActive")
      .exec()
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto
  ): Promise<Contact> {
    const existingContact = await this.contactModel
      .findByIdAndUpdate(id, updateContactDto, { new: true })
      .exec()

    if (!existingContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`)
    }
    return existingContact
  }

  async remove(id: string): Promise<Contact> {
    const contact = await this.contactModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec()
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`)
    }
    return contact
  }
}
