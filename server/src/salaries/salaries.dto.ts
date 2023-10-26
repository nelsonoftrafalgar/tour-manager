import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PickType,
} from '@nestjs/swagger'
import {
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator'

export const AMOUNT_CONSTRAIN = /^\d+(,\d{1,2})?$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export class Salary {
  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  amount: string

  @ApiProperty()
  bandId: string

  @ApiProperty()
  concertId: string

  @ApiProperty()
  tourManagerId: string
}

export class SalaryDTO {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @IsString()
  @MaxLength(13)
  @Matches(AMOUNT_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  amount: string

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  @Matches(WHITESPACE_CONSTRAIN)
  comment: string

  @ApiProperty()
  @IsUUID()
  bandId: string

  @ApiProperty()
  @IsUUID()
  concertId: string

  @ApiProperty()
  @IsUUID()
  tourManagerId: string
}

export class DeleteSalaryDTO extends PickType(SalaryDTO, ['id']) {}
export class NewSalaryDTO extends OmitType(SalaryDTO, ['id']) {}

export class SalaryReportParamsDTO {
  @IsOptional()
  @ApiPropertyOptional()
  @IsUUID()
  bandId: string

  @IsOptional()
  @ApiPropertyOptional()
  @IsUUID()
  concertId: string

  @IsOptional()
  @ApiPropertyOptional()
  @IsUUID()
  tourManagerId: string
}

export class SalaryReport {
  @ApiProperty()
  id: string

  @ApiProperty()
  amount: string

  @ApiProperty()
  band: {
    name: string
  }

  @ApiProperty()
  tourManager: {
    name: string
  }

  @ApiProperty()
  concert: {
    place: string
  }
}

export class SalaryGetResponse {
  @ApiProperty()
  id: string

  @ApiProperty()
  amount: string

  @ApiProperty()
  band: {
    name: string
    id: string
  }

  @ApiProperty()
  tourManager: {
    name: string
    id: string
  }

  @ApiProperty()
  concert: {
    place: string
    date: string
    id: string
  }
}
