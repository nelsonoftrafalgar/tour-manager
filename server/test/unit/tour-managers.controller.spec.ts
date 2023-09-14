import {
  MOCK_TOUR_MANAGER_NAME,
  mockTourManagerService,
} from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersController } from '../../src/tourManagers/tourManagers.controller'
import { TourManagersService } from '../../src/tourManagers/tourManagers.service'

describe('TourManagersController', () => {
  let controller: TourManagersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourManagersController],
      providers: [TourManagersService],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockTourManagerService)
      .compile()

    controller = module.get<TourManagersController>(TourManagersController)
  })

  it('should be able to get tour managers list', () => {
    expect(
      controller.getTourManagers({ name: MOCK_TOUR_MANAGER_NAME }),
    ).toMatchObject(mockTourManagerService.getTourManagers())
  })
})
