import { IsArray, IsOptional, IsString } from "class-validator"

export class CreateSubCategoryDto {
  @IsString()
  readonly category: string

  @IsString()
  readonly title: string

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  readonly entries?: string[]

  @IsString()
  readonly domain: string
}
