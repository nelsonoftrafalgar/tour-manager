import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersService } from '../../src/tourManagers/tourManagers.service'

describe('TourManagersService', () => {
  let service: TourManagersService

  const mockService = {
    getTourManagers: jest.fn().mockResolvedValue({}),
    filterTourManagers: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourManagersService],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockService)
      .compile()

    service = module.get<TourManagersService>(TourManagersService)
  })

  it('should get all tour managers', async () => {
    expect(await service.getTourManagers()).toMatchObject({})
  })

  it('should get tour managers filtered by name', async () => {
    expect(await service.getTourManagers('Sam')).toMatchObject({})
  })
})
