import { MOCK_BAND_ID, MOCK_BAND_NAME, mockBandService } from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { BandsController } from '../../src/bands/bands.controller'
import { BandsService } from '../../src/bands/bands.service'

describe('BandsController', () => {
  let controller: BandsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BandsController],
      providers: [BandsService],
    })
      .overrideProvider(BandsService)
      .useValue(mockBandService)
      .compile()

    controller = module.get<BandsController>(BandsController)
  })

  it('should be able to get bands list', () => {
    const result = controller.getBands({ name: MOCK_BAND_NAME })
    expect(result).toEqual(mockBandService.getBands())
  })

  it('should be able to get all band names', () => {
    const result = controller.getBandNames()
    expect(result).toEqual(mockBandService.getBandNames())
  })

  it('should be able to get band by id', () => {
    const result = controller.getBandById({ id: MOCK_BAND_ID })
    expect(result).toEqual(mockBandService.getBandById())
  })

  it('should be able to create new band', () => {
    const result = controller.createBand(mockBandService.createBand())
    expect(result).toEqual(mockBandService.createBand())
  })

  it('should be able to update band', () => {
    const result = controller.updateBand(mockBandService.updateBand())
    expect(result).toEqual(mockBandService.updateBand())
  })
})
