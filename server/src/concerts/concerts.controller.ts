import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common'
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { BandIdDTO } from '../../src/bands/bands.dto'
import {
  Concert,
  ConcertDTO,
  ConcertIdDTO,
  ConcertPlaceDTO,
  NewConcertDTO,
} from './concerts.dto'
import { ConcertsService } from './concerts.service'
import { Response } from 'express'

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertService: ConcertsService) {}

  @Get()
  @ApiOkResponse({
    type: [Concert],
    description: 'Get filtered or all concerts',
  })
  getConcerts(@Query() { place }: ConcertPlaceDTO) {
    return this.concertService.getConcerts(place)
  }

  @Get(':id')
  @ApiOkResponse({ type: [Concert], description: 'Get concert by band ID' })
  getConcertsByBandId(@Param() { id }: BandIdDTO) {
    return this.concertService.getConcertsByBandId(id)
  }

  @Post()
  @ApiConflictResponse({ description: 'Concert already exists in DB' })
  @ApiCreatedResponse({ type: [Concert], description: 'Add new concert' })
  createConcert(@Body() data: NewConcertDTO) {
    return this.concertService.createConcert(data)
  }

  @Put()
  @ApiConflictResponse({ description: 'Concert already exists in DB' })
  @ApiOkResponse({ type: [Concert], description: 'Edit existing concert' })
  updateConcert(@Body() data: ConcertDTO) {
    return this.concertService.updateConcert(data)
  }

  @Delete(':id')
  @ApiOkResponse({ type: String, description: 'Delete concert' })
  @ApiNotFoundResponse({ type: String, description: 'Concert not found' })
  async deleteConcert(@Param() { id }: ConcertIdDTO, @Res() res: Response) {
    try {
      await this.concertService.deleteConcert(id)
      res
        .status(HttpStatus.OK)
        .json({ message: `Concert has been successfully deleted` })
    } catch ({ message }) {
      res.status(HttpStatus.NOT_FOUND).json({ message })
    }
  }
}
