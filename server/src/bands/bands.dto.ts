import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import {
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator'

const NAME_CONSTRAIN = /^[A-Za-z\s]+$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export class Band {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  frontMan: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class BandName extends PickType(Band, ['id', 'name']) {}

export class BandNameDTO {
  @ValidateIf(({ name }) => name?.length > 0)
  @ApiPropertyOptional()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  name: string
}

export class BandDTO {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @MaxLength(250)
  @IsString()
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  name: string

  @ApiProperty()
  @MaxLength(250)
  @IsString()
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  frontMan: string
}

export class BandIdDTO extends PickType(BandDTO, ['id']) {}
export class NewBandDTO extends PickType(BandDTO, ['name', 'frontMan']) {}
