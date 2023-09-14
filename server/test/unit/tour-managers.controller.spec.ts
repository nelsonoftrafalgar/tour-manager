import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersController } from '../../src/tourManagers/tourManagers.controller'
import { TourManagersService } from '../../src/tourManagers/tourManagers.service'

describe('TourManagersController', () => {
  let controller: TourManagersController
  const mockService = {
    getTourManagers: jest.fn(() => ({})),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourManagersController],
      providers: [TourManagersService],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockService)
      .compile()

    controller = module.get<TourManagersController>(TourManagersController)
  })

  it('should be able to get tour managers list', () => {
    expect(controller.getTourManagers({ name: undefined })).toMatchObject({})
  })
})
