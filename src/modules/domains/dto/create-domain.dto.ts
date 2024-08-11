import { IsOptional, IsString, IsUrl } from "class-validator"

export class CreateDomainDto {
  @IsString()
  readonly name: string

  @IsString()
  @IsUrl()
  readonly url: string

  @IsString()
  @IsOptional()
  readonly description: string

  @IsString()
  @IsOptional()
  readonly favicon: string

  @IsString()
  @IsOptional()
  readonly logo: string
}
