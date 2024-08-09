import { IsOptional, IsString } from "class-validator"

export class CreatePageDto {
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
  readonly domain: string
}
