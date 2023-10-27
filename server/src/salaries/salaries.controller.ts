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
} from '@nestjs/common'
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import {
  DeleteSalaryDTO,
  NewSalaryDTO,
  Salary,
  SalaryDTO,
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

  // @Get()
  // @ApiOkResponse({ type: [Salary], description: 'Generate report' })
  // getReport(@Query() query: SalaryReportParamsDTO) {
  //   return this.salariesService.getReport(query)
  // }

  @Post()
  @ApiCreatedResponse({ type: [Salary], description: 'Add new salary' })
  @ApiConflictResponse({ description: 'Salary already exists in DB' })
  createSalary(@Body() data: NewSalaryDTO) {
    return this.salariesService.createSalary(data)
  }

  @Delete(':id')
  @ApiOkResponse({ type: Number, description: 'Delete salary' })
  async deleteSalary(@Param() { id }: DeleteSalaryDTO, @Res() res: Response) {
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
  @ApiOkResponse({ type: [Salary], description: 'Edit salary' })
  @ApiConflictResponse({ description: 'Salary already exists in DB' })
  updateSalary(@Body() data: SalaryDTO) {
    return this.salariesService.updateSalary(data)
  }
}
