import { IsString } from "class-validator"

export class CreateOriginDto {
  @IsString()
  readonly name: string
}
