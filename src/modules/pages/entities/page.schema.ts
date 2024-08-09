import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as SchemaMongoose } from "mongoose"

@Schema({ selectPopulatedPaths: true })
export class Page extends Document {
  @Prop({ required: true })
  title: string

  @Prop()
  subTitle: string

  @Prop({ required: true })
  type: string

  @Prop({ required: true })
  url: string

  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: "Domain" }) // Reference the Domain model
  domain: SchemaMongoose.Types.ObjectId

  @Prop({ default: true, select: false })
  isActive: boolean

  @Prop({ select: false }) // this will hide the __v when you do a select/find query
  __v: number
}

export const PageSchema = SchemaFactory.createForClass(Page)
