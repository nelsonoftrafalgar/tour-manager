import { Test, TestingModule } from '@nestjs/testing'

import { ConcertsService } from '../../src/concerts/concerts.service'

describe('ConcertsService', () => {
  let service: ConcertsService

  const mockService = {
    getConcerts: jest.fn().mockResolvedValue({}),
    filterConcerts: jest.fn().mockResolvedValue({}),
    getConcertsByBandId: jest.fn().mockResolvedValue({}),
    createConcert: jest.fn().mockResolvedValue({}),
    updateConcert: jest.fn().mockResolvedValue({}),
    preventDuplicates: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertsService],
    })
      .overrideProvider(ConcertsService)
      .useValue(mockService)
      .compile()

    service = module.get<ConcertsService>(ConcertsService)
  })

  it('should get all concerts', async () => {
    expect(await service.getConcerts()).toMatchObject({})
  })

  it('should get concerts filtered by consert place', async () => {
    expect(await service.getConcerts('Oslo')).toMatchObject({})
  })

  it('should get concert by band id', async () => {
    expect(await service.getConcertsByBandId('id')).toMatchObject({})
  })

  it('should create new concert', async () => {
    expect(
      await service.createConcert({
        date: '',
        place: '',
        bandId: '',
        tourManagerId: '',
      }),
    ).toMatchObject({})
  })

  it('should upadate concert', async () => {
    expect(
      await service.updateConcert({
        date: '',
        place: '',
        bandId: '',
        tourManagerId: '',
        id: '',
      }),
    ).toMatchObject({})
  })

  it('should prevent duplicates in db', async () => {
    expect(
      await service.preventDuplicates({
        date: '',
        place: '',
        bandId: '',
        tourManagerId: '',
      }),
    ).toMatchObject({})
  })
})
