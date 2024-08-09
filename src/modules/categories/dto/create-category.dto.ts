import { IsArray, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateCategoryDto {
  @IsString()
  readonly title: string

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  readonly subCategories?: Types.ObjectId[]

  @IsString()
  readonly domain: string
}
