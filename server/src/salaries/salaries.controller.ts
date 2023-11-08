import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  HttpStatus,
  Post,
  Put,
  Res,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common'
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import {
  Salary,
  CreateSalaryRequest,
  DeleteSalaryRequest,
  UpdateSalaryRequest,
  SalaryReport,
} from './salaries.dto'
import { SalariesService } from './salaries.service'
import { Response } from 'express'

@Controller('salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Get()
  @ApiOkResponse({ type: [Salary], description: 'Get all salaries' })
  getSalaries() {
    return this.salariesService.getSalaries()
  }

  @Get('report')
  @ApiOkResponse({ type: [SalaryReport], description: 'Generate report' })
  async getReport(
    @Query('date') date: string,
    @Query('bandId', new ParseUUIDPipe({ optional: true })) bandId: string,
    @Query('concertId', new ParseUUIDPipe({ optional: true }))
    concertId: string,
    @Query('tourManagerId', new ParseUUIDPipe({ optional: true }))
    tourManagerId: string,
    @Res() res: Response,
  ) {
    try {
      const report = await this.salariesService.getReport({
        date,
        bandId,
        concertId,
        tourManagerId,
      })
      res.status(HttpStatus.OK).json(report)
    } catch ({ message }) {
      res.status(HttpStatus.NOT_FOUND).json({ message })
    }
  }

  @Post()
  @ApiCreatedResponse({ description: 'Add new salary' })
  @ApiConflictResponse({ description: 'Salary already exists in DB' })
  async createSalary(@Body() data: CreateSalaryRequest, @Res() res: Response) {
    try {
      await this.salariesService.createSalary(data)
      res.status(HttpStatus.CREATED).json({
        message: 'Salary has been successfully created',
      })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete salary' })
  async deleteSalary(
    @Param() { id }: DeleteSalaryRequest,
    @Res() res: Response,
  ) {
    try {
      await this.salariesService.deleteSalary(id)
      res
        .status(HttpStatus.OK)
        .json({ message: `Salary has been successfully deleted` })
    } catch ({ message }) {
      res.status(HttpStatus.NOT_FOUND).json({ message })
    }
  }

  @Put()
  @ApiOkResponse({ type: Salary, description: 'Edit salary' })
  @ApiConflictResponse({ description: 'Salary already exists in DB' })
  async updateSalary(@Body() data: UpdateSalaryRequest, @Res() res: Response) {
    try {
      const salary = await this.salariesService.updateSalary(data)
      res.status(HttpStatus.OK).json({
        message: 'Salary has been successfully updated',
        data: salary,
      })
    } catch ({ message }) {
      res.status(HttpStatus.CONFLICT).json({ message })
    }
  }
}
