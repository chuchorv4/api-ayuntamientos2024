import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema()
export class Entry extends Document {
  @Prop({ required: true })
  title: string

  @Prop()
  subTitle: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  url: string

  @Prop({ type: Types.ObjectId, ref: "Category" })
  subCategory: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "Domain" })
  domain: Types.ObjectId

  @Prop({ default: true, select: false })
  isActive: boolean

  @Prop({ select: false }) // this will hide the __v when you do a select/find query
  __v: number
}

export const EntrySchema = SchemaFactory.createForClass(Entry)
