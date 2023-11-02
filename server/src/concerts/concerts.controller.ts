import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import {
  Concert,
  CreateConcertRequest,
  DeleteConcertRequest,
  UpdateConcertRequest,
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
  getConcerts() {
    return this.concertService.getConcerts()
  }

  @Post()
  @ApiCreatedResponse({ type: [Concert], description: 'Add new concert' })
  @ApiConflictResponse({ description: 'Concert already exists in DB' })
  async createConcert(
    @Body() data: CreateConcertRequest,
    @Res() res: Response,
  ) {
    try {
      const concert = await this.concertService.createConcert(data)
      res.status(HttpStatus.CREATED).json({
        message: 'Concert has been successfully created',
        data: concert,
      })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }

  @Put()
  @ApiOkResponse({ type: [Concert], description: 'Edit existing concert' })
  @ApiConflictResponse({ description: 'Concert already exists in DB' })
  async updateConcert(
    @Body() data: UpdateConcertRequest,
    @Res() res: Response,
  ) {
    try {
      const concert = await this.concertService.updateConcert(data)
      res.status(HttpStatus.OK).json({
        message: 'Concert has been successfully updated',
        data: concert,
      })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: String, description: 'Delete concert' })
  @ApiNotFoundResponse({ type: String, description: 'Concert not found' })
  async deleteConcert(
    @Param() { id }: DeleteConcertRequest,
    @Res() res: Response,
  ) {
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
