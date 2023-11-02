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
  CreateTourManagerRequest,
  DeleteTourManagerRequest,
  TourManager,
  UpdateTourManagerRequest,
} from './tourManagers.dto'
import { TourManagersService } from './tourManagers.service'
import { Response } from 'express'

@Controller('tour_managers')
export class TourManagersController {
  constructor(private readonly tourManagersService: TourManagersService) {}

  @Get()
  @ApiOkResponse({
    type: [TourManager],
    description: 'Get filtered or all tour managers',
  })
  getTourManagers() {
    return this.tourManagersService.getTourManagers()
  }

  @Post()
  @ApiCreatedResponse({
    type: [TourManager],
    description: 'Add new tour manager',
  })
  @ApiConflictResponse({ description: 'Tour manager already exists in DB' })
  async createTourManager(
    @Body() data: CreateTourManagerRequest,
    @Res() res: Response,
  ) {
    try {
      const tourManager = await this.tourManagersService.createTourManager(data)
      res.status(HttpStatus.CREATED).json({
        message: 'Tour manager has been successfully created',
        data: tourManager,
      })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }

  @Put()
  @ApiOkResponse({
    type: [TourManager],
    description: 'Edit existing tour manager',
  })
  @ApiConflictResponse({ description: 'Tour manager already exists in DB' })
  async updateTourManager(
    @Body() data: UpdateTourManagerRequest,
    @Res() res: Response,
  ) {
    try {
      const tourManager = await this.tourManagersService.updateTourManager(data)
      res.status(HttpStatus.OK).json({
        message: 'Tour manager has been successfully updated',
        data: tourManager,
      })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: String, description: 'Delete tour manager' })
  @ApiNotFoundResponse({ type: String, description: 'Tour manager not found' })
  async deleteTourManager(
    @Param() { id }: DeleteTourManagerRequest,
    @Res() res: Response,
  ) {
    try {
      const tourManager = await this.tourManagersService.deleteTourManager(id)
      res
        .status(HttpStatus.OK)
        .json({ message: `${tourManager.name} has been successfully deleted` })
    } catch ({ message }) {
      res.status(HttpStatus.NOT_FOUND).json({ message })
    }
  }
}
