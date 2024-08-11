import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema()
export class Type extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  origin: Types.ObjectId

  @Prop({ default: true, select: false })
  isActive: boolean

  @Prop({ select: false }) // this will hide the __v when you do a select/find query
  __v: number
}

export const TypeSchema = SchemaFactory.createForClass(Type)
