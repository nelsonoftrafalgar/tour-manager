import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator'

export const AMOUNT_CONSTRAIN = /^\$\d+(\.\d{1,2})?$/
export const WHITESPACE_CONSTRAIN = /^([^\s]+(\s+[^\s]+)*)?$/

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
  comment: string

  @ApiProperty()
  bandId: string

  @ApiProperty()
  concertId: string

  @ApiProperty()
  tourManagerId: string
}

export class SalaryGetReportRequest {
  @ApiProperty()
  date: string

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
  comment: string

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
    date: string
    id: string
  }
}

export class SalaryCreateRequest {
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
  concertId: string
}

export class SalaryUpdateRequest {
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
  concertId: string
}

export class SalaryDeleteRequest {
  @ApiProperty()
  @IsUUID()
  id: string
}

export class SalaryDuplicateCheckParams {
  comment: string
  amount: string
  concertId: string
  bandId: string
  tourManagerId: string
}
