import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsUUID, Matches, MaxLength, ValidateIf } from 'class-validator'

const NAME_CONSTRAIN = /^[A-Za-z\s]+$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export class TourManagerNameDTO {
  @ValidateIf(({ name }) => name?.length > 0)
  @ApiPropertyOptional()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  name: string
}

export class TourManager {
  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  name: string
}

export class TourManagerDTO {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  name: string
}

export class TourManagerIdDTO extends PickType(TourManagerDTO, ['id']) {}
export class NewTourManagerDTO extends PickType(TourManagerDTO, ['name']) {}
