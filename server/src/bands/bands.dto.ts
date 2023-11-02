import { IsString, IsUUID, Matches, MaxLength } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

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

export class CreateBandRequest {
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

export class UpdateBandRequest {
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

export class DeleteBandRequet {
  @ApiProperty()
  @IsUUID()
  id: string
}
