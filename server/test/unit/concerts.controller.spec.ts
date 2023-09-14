import { MOCK_CONCERT_ID, mockConcertService } from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { ConcertsController } from '../../src/concerts/concerts.controller'
import { ConcertsService } from '../../src/concerts/concerts.service'

describe('ConcertsController', () => {
  let controller: ConcertsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [ConcertsService],
    })
      .overrideProvider(ConcertsService)
      .useValue(mockConcertService)
      .compile()

    controller = module.get<ConcertsController>(ConcertsController)
  })

  it('should be able to get concerts list', () => {
    expect(controller.getConcerts({ place: undefined })).toMatchObject(
      mockConcertService.getConcerts(),
    )
  })

  it('should be able to get concert by band id', () => {
    expect(
      controller.getConcertsByBandId({ id: MOCK_CONCERT_ID }),
    ).toMatchObject(mockConcertService.getConcertsByBandId())
  })

  it('should be able to create new concert', () => {
    expect(
      controller.createConcert(mockConcertService.createConcert()),
    ).toMatchObject(mockConcertService.createConcert())
  })

  it('should be able to update concert', () => {
    expect(
      controller.updateConcert(mockConcertService.updateConcert()),
    ).toMatchObject(mockConcertService.updateConcert())
  })
})
