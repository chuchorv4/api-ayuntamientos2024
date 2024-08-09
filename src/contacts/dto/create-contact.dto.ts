import { IsEmail, IsNumberString, IsString } from "class-validator"

export class CreateContactDto {
  @IsString()
  readonly fullName: string

  @IsString()
  readonly address: string

  @IsNumberString()
  readonly phone: string

  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  readonly page: string

  @IsString()
  readonly domain: string
}
