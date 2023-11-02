import {
  IsDateString,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

const NAME_CONSTRAIN = /^[A-Za-z\s]+$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export class Concert {
  @ApiProperty()
  id: string

  @ApiProperty()
  place: string

  @ApiProperty()
  date: string

  @ApiProperty()
  bandId: string

  @ApiProperty()
  tourManagerId: string
}

export class GetConcertResponse {
  @ApiProperty()
  id: string

  @ApiProperty()
  place: string

  @ApiProperty()
  date: string

  @ApiProperty()
  band: {
    name: string
  }

  @ApiProperty()
  tourManager: {
    name: string
  }
}

export class UpdateConcertRequest {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @MaxLength(250)
  @IsString()
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  place: string

  @ApiProperty()
  @IsDateString()
  date: string

  @ApiProperty()
  @IsUUID()
  bandId: string

  @ApiProperty()
  @IsUUID()
  tourManagerId: string
}

export class CreateConcertRequest {
  @ApiProperty()
  @MaxLength(250)
  @IsString()
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  place: string

  @ApiProperty()
  @IsDateString()
  date: string

  @ApiProperty()
  @IsUUID()
  bandId: string

  @ApiProperty()
  @IsUUID()
  tourManagerId: string
}

export class DeleteConcertRequest {
  @ApiProperty()
  @IsUUID()
  id: string
}
