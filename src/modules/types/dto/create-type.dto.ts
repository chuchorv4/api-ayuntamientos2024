import { IsBoolean, IsString } from "class-validator"

export class CreateTypeDto {
  @IsString()
  readonly name: string

  @IsBoolean()
  readonly isActive: boolean

  @IsString()
  readonly origin: string
}
