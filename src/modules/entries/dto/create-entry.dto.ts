import { IsOptional, IsString } from "class-validator"

export class CreateEntryDto {
  @IsString()
  readonly title: string

  @IsString()
  @IsOptional()
  readonly subTitle?: string

  @IsString()
  readonly type: string

  @IsString()
  readonly url: string

  @IsString()
  readonly subCategory: string

  @IsString()
  readonly domain: string
}
