import { BandsService } from './bands.service'
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import {
  Band,
  BandDTO,
  BandIdDTO,
  BandName,
  BandNameDTO,
  NewBandDTO,
} from './bands.dto'

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Get()
  @ApiOkResponse({ type: [Band], description: 'Get filtered or all bands' })
  getBands(@Query() { name }: BandNameDTO) {
    return this.bandsService.getBands(name)
  }

  @Get('all_names')
  @ApiOkResponse({ type: [BandName], description: 'Get all band names' })
  getAllBandNames() {
    return this.bandsService.getBandNames()
  }

  @Get(':id')
  @ApiOkResponse({ type: [Band], description: 'Get band by ID' })
  getBandById(@Param() { id }: BandIdDTO) {
    return this.bandsService.getBandById(id)
  }

  @Post()
  @ApiCreatedResponse({ type: [Band], description: 'Add new band' })
  @ApiConflictResponse({ description: 'Band already exists in DB' })
  createBand(@Body() data: NewBandDTO) {
    return this.bandsService.createBand(data)
  }

  @Put()
  @ApiOkResponse({ type: [Band], description: 'Edit existing band' })
  @ApiConflictResponse({ description: 'Band already exists in DB' })
  updateBand(@Body() data: BandDTO) {
    return this.bandsService.updateBand(data)
  }
}
