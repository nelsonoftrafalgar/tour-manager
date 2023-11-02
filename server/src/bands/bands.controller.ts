import { BandsService } from './bands.service'
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
  ApiOkResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import {
  Band,
  CreateBandRequest,
  DeleteBandRequet,
  UpdateBandRequest,
} from './bands.dto'
import { Response } from 'express'

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  @ApiOkResponse({ type: [Band], description: 'Get filtered or all bands' })
  getBands() {
    return this.bandsService.getBands()
  }

  @Post()
  @ApiCreatedResponse({ type: [Band], description: 'Add new band' })
  @ApiConflictResponse({ description: 'Band already exists in DB' })
  async createBand(@Body() data: CreateBandRequest, @Res() res: Response) {
    try {
      const band = await this.bandsService.createBand(data)
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'Band has been successfully created', data: band })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }

  @Put()
  @ApiOkResponse({ type: [Band], description: 'Edit existing band' })
  @ApiConflictResponse({ description: 'Band already exists in DB' })
  async updateBand(@Body() data: UpdateBandRequest, @Res() res: Response) {
    try {
      const band = await this.bandsService.updateBand(data)
      res
        .status(HttpStatus.OK)
        .json({ message: 'Band has been successfully updated', data: band })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: String, description: 'Delete band' })
  @ApiNotFoundResponse({ type: String, description: 'Band not found' })
  async deleteBand(@Param() { id }: DeleteBandRequet, @Res() res: Response) {
    try {
      const band = await this.bandsService.deleteBand(id)
      res
        .status(HttpStatus.OK)
        .json({ message: `${band.name} has been successfully deleted` })
    } catch ({ message }) {
      res.status(HttpStatus.NOT_FOUND).json({ message })
    }
  }
}
