import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Domain extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  url: string

  @Prop({ default: true, select: false })
  isActive: boolean

  @Prop({ select: false }) // this will hide the __v when you do a select/find query
  __v: number
}

export const DomainSchema = SchemaFactory.createForClass(Domain)
