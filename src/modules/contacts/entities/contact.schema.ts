import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema()
export class Contact extends Document {
  @Prop({ required: true })
  fullName: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  email: string

  @Prop({ type: Types.ObjectId, ref: "Page" })
  page: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "Domain" })
  domain: Types.ObjectId

  @Prop({ default: true, select: false })
  isActive: boolean

  @Prop({ select: false }) // this will hide the __v when you do a select/find query
  __v: number
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
