import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import {
  IsDateString,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator'

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

export class ConcertGetResponse {
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

export class ConcertPlaceDTO {
  @ValidateIf(({ place }) => place?.length > 0)
  @ApiPropertyOptional()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  place: string
}

export class ConcertDTO {
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

export class NewConcertDTO extends OmitType(ConcertDTO, ['id']) {}
