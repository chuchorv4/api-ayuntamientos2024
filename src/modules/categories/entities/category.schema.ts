import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  title: string

  @Prop([{ type: Types.ObjectId, ref: "SubCategory" }])
  subCategories: Types.ObjectId[]

  @Prop({ type: Types.ObjectId, ref: "Domain" })
  domain: Types.ObjectId

  @Prop({ default: true, select: false })
  isActive: boolean

  @Prop({ select: false }) // this will hide the __v when you do a select/find query
  __v: number
}

export const CategorySchema = SchemaFactory.createForClass(Category)
