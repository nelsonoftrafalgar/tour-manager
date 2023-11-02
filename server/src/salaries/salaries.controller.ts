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
  @ApiOkResponse({ type: [Salary], description: 'Generate report' })
  getReport(
    @Query('date') date: string,
    @Query('bandId') bandId: string,
    @Query('concertId') concertId: string,
    @Query('tourManagerId') tourManagerId: string,
  ) {
    return this.salariesService.getReport({
      date,
      bandId,
      concertId,
      tourManagerId,
    })
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
