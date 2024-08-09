import { IsString, IsUrl } from "class-validator"

export class CreateDomainDto {
  @IsString()
  readonly name: string
  @IsString()
  @IsUrl()
  readonly url: string
}
