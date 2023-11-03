import { IsUUID, Matches, MaxLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

const NAME_CONSTRAIN = /^[A-Za-z\s]+$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

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

export class UpdateTourManagerRequest {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  name: string
}

export class CreateTourManagerRequest {
  @ApiProperty()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  name: string
}

export class DeleteTourManagerRequest {
  @ApiProperty()
  @IsUUID()
  id: string
}
