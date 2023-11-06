import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import {
  MOCK_BAND_ID,
  MOCK_CONCERT_ID,
  MOCK_DATE,
  MOCK_SALARY_ID,
  MOCK_TOUR_MANAGER_ID,
  mockSalaryService,
} from '../../test/mocks'
import { Salary, SalaryReport } from 'src/salaries/salaries.dto'
import { Test, TestingModule } from '@nestjs/testing'

import { Response } from 'express'
import { SalariesController } from '../../src/salaries/salaries.controller'
import { SalariesService } from '../../src/salaries/salaries.service'

describe('SalariesController', () => {
  let controller: SalariesController
  let salaryService: SalariesService

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalariesController],
      providers: [SalariesService],
    })
      .overrideProvider(SalariesService)
      .useValue(mockSalaryService)
      .compile()

    controller = module.get<SalariesController>(SalariesController)
    salaryService = module.get<SalariesService>(SalariesService)
  })

  it('should be able to get report', async () => {
    const newReportData = mockSalaryService.getReport() as SalaryReport[]

    const getReportSpy = jest
      .spyOn(salaryService, 'getReport')
      .mockResolvedValue(newReportData)

    await controller.getReport(
      MOCK_DATE,
      MOCK_BAND_ID,
      MOCK_CONCERT_ID,
      MOCK_TOUR_MANAGER_ID,
      res as Response,
    )

    expect(getReportSpy).toHaveBeenCalledWith({
      date: MOCK_DATE,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
      concertId: MOCK_CONCERT_ID,
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(newReportData)
  })

  it('should be able to return error message if band was not found', async () => {
    const getReportSpy = jest
      .spyOn(salaryService, 'getReport')
      .mockRejectedValue(new NotFoundException(`Band not found`))

    await controller.getReport(
      MOCK_DATE,
      MOCK_BAND_ID,
      MOCK_CONCERT_ID,
      MOCK_TOUR_MANAGER_ID,
      res as Response,
    )

    expect(getReportSpy).toHaveBeenCalledWith({
      date: MOCK_DATE,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
      concertId: MOCK_CONCERT_ID,
    })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Band not found' })
  })
  it('should be able to return error message if tour manager was not found', async () => {
    const getReportSpy = jest
      .spyOn(salaryService, 'getReport')
      .mockRejectedValue(new NotFoundException(`Tour manager not found`))

    await controller.getReport(
      MOCK_DATE,
      MOCK_BAND_ID,
      MOCK_CONCERT_ID,
      MOCK_TOUR_MANAGER_ID,
      res as Response,
    )

    expect(getReportSpy).toHaveBeenCalledWith({
      date: MOCK_DATE,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
      concertId: MOCK_CONCERT_ID,
    })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Tour manager not found' })
  })
  it('should be able to return error message if concert was not found', async () => {
    const getReportSpy = jest
      .spyOn(salaryService, 'getReport')
      .mockRejectedValue(new NotFoundException(`Concert not found`))

    await controller.getReport(
      MOCK_DATE,
      MOCK_BAND_ID,
      MOCK_CONCERT_ID,
      MOCK_TOUR_MANAGER_ID,
      res as Response,
    )

    expect(getReportSpy).toHaveBeenCalledWith({
      date: MOCK_DATE,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
      concertId: MOCK_CONCERT_ID,
    })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Concert not found' })
  })

  it('should be able to get salary list', () => {
    expect(controller.getSalaries()).toMatchObject(
      mockSalaryService.getSalaries(),
    )
  })

  it('should be able to delete salary', async () => {
    const id = MOCK_SALARY_ID

    const deleteSalarySpy = jest
      .spyOn(salaryService, 'deleteSalary')
      .mockResolvedValue({} as Salary)

    await controller.deleteSalary({ id }, res as Response)

    expect(deleteSalarySpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Salary has been successfully deleted',
    })
  })

  it('should return a not found response if the salary is not found', async () => {
    const id = MOCK_SALARY_ID

    const deleteSalarySpy = jest
      .spyOn(salaryService, 'deleteSalary')
      .mockRejectedValue(new NotFoundException('Salary not found'))

    await controller.deleteSalary({ id }, res as Response)

    expect(deleteSalarySpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Salary not found' })
  })

  it('should create a new salary and return a success response', async () => {
    const newSalaryData = mockSalaryService.createSalary() as Salary
    const response = {
      message: 'Salary has been successfully created',
    }

    jest.spyOn(salaryService, 'createSalary').mockResolvedValue(newSalaryData)

    await controller.createSalary(newSalaryData, res as Response)
    expect(salaryService.createSalary).toHaveBeenCalledWith(newSalaryData)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith(response)
  })

  it('should handle a create conflict and return a conflict response', async () => {
    const newSalaryData = mockSalaryService.createSalary()

    const salaryCreateSpy = jest
      .spyOn(salaryService, 'createSalary')
      .mockRejectedValue(new ConflictException('Salary already exists'))

    await controller.createSalary(newSalaryData, res as Response)

    expect(salaryCreateSpy).toHaveBeenCalledWith(newSalaryData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Salary already exists',
    })
  })

  it('should update a salary and return a success response', async () => {
    const updatedSalary = mockSalaryService.updateSalary() as Salary

    jest.spyOn(salaryService, 'updateSalary').mockResolvedValue(updatedSalary)

    await controller.updateSalary(updatedSalary, res as Response)

    expect(salaryService.updateSalary).toHaveBeenCalledWith(updatedSalary)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Salary has been successfully updated',
      data: updatedSalary,
    })
  })

  it('should handle a update conflict and return a conflict response', async () => {
    const updateSalaryData = mockSalaryService.updateSalary()

    const salaryUpdateSpy = jest
      .spyOn(salaryService, 'updateSalary')
      .mockRejectedValue(new ConflictException('Salary already exists'))

    await controller.updateSalary(updateSalaryData, res as Response)

    expect(salaryUpdateSpy).toHaveBeenCalledWith(updateSalaryData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Salary already exists',
    })
  })
})
