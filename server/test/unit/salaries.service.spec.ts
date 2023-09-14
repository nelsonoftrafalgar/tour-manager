import { Test, TestingModule } from '@nestjs/testing'

import { SalariesService } from '../../src/salaries/salaries.service'

describe('SalariesService', () => {
  let service: SalariesService

  const mockService = {
    createSalary: jest.fn().mockResolvedValue({}),
    getReport: jest.fn().mockResolvedValue({}),
    updateSalary: jest.fn().mockResolvedValue({}),
    deleteSalary: jest.fn().mockResolvedValue({}),
    preventDuplicates: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalariesService],
    })
      .overrideProvider(SalariesService)
      .useValue(mockService)
      .compile()

    service = module.get<SalariesService>(SalariesService)
  })

  it('should create salary', () => {
    expect(
      service.createSalary({
        amount: '',
        bandId: '',
        concertId: '',
        tourManagerId: '',
      }),
    ).toMatchObject({})
  })

  it('should get report', () => {
    expect(
      service.getReport({ bandId: '', concertId: '', tourManagerId: '' }),
    ).toMatchObject({})
  })

  it('should update salary', () => {
    expect(
      service.updateSalary({
        amount: '',
        bandId: '',
        concertId: '',
        tourManagerId: '',
        id: '',
      }),
    ).toMatchObject({})
  })

  it('should delete salary', () => {
    expect(service.deleteSalary('')).toMatchObject({})
  })

  it('should prevent duplicates in DB', () => {
    expect(
      service.preventDuplicates({
        amount: '',
        bandId: '',
        concertId: '',
        tourManagerId: '',
      }),
    ).toMatchObject({})
  })
})
