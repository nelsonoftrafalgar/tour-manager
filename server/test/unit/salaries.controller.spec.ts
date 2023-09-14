import {
  MOCK_AMOUNT,
  MOCK_BAND_ID,
  MOCK_CONCERT_ID,
  MOCK_SALARY_ID,
  MOCK_TOUR_MANAGER_ID,
  mockSalaryService,
} from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { SalariesController } from '../../src/salaries/salaries.controller'
import { SalariesService } from '../../src/salaries/salaries.service'

describe('SalariesController', () => {
  let controller: SalariesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalariesController],
      providers: [SalariesService],
    })
      .overrideProvider(SalariesService)
      .useValue(mockSalaryService)
      .compile()

    controller = module.get<SalariesController>(SalariesController)
  })

  it('should be able to get concerts list', () => {
    expect(
      controller.getReport({
        bandId: MOCK_BAND_ID,
        concertId: MOCK_CONCERT_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      }),
    ).toMatchObject(mockSalaryService.getReport())
  })

  it('should be able to delete salary', () => {
    expect(controller.deleteSalary({ id: MOCK_SALARY_ID })).toMatchObject(
      mockSalaryService.deleteSalary(),
    )
  })

  it('should be able to create new salary', () => {
    expect(
      controller.createSalary({
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      }),
    ).toMatchObject(mockSalaryService.createSalary())
  })

  it('should be able to update salary', () => {
    expect(
      controller.updateSalary({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      }),
    ).toMatchObject(mockSalaryService.updateSalary())
  })
})
