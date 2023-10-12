import { MOCK_BAND_ID, MOCK_BAND_NAME, mockBandService } from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { Band } from 'src/bands/bands.dto'
import { BandsController } from '../../src/bands/bands.controller'
import { BandsService } from '../../src/bands/bands.service'
import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

describe('BandsController', () => {
  let controller: BandsController
  let bandsService: BandsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BandsController],
      providers: [BandsService],
    })
      .overrideProvider(BandsService)
      .useValue(mockBandService)
      .compile()

    controller = module.get<BandsController>(BandsController)
    bandsService = module.get<BandsService>(BandsService)
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

  it('should delete a band and return success message', async () => {
    const bandId = MOCK_BAND_ID
    const band = { name: MOCK_BAND_NAME } as Band

    jest.spyOn(bandsService, 'deleteBand').mockResolvedValue(band)
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const result = await controller.deleteBand(bandId, res as Response)

    expect(result).toEqual(undefined)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({
      message: `${band.name} has been successfully deleted`,
    })
  })

  it('should return a 404 error if the band is not found', async () => {
    const bandId = MOCK_BAND_ID

    jest.spyOn(bandsService, 'deleteBand').mockResolvedValue(null)
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const result = await controller.deleteBand(bandId, res as Response)

    expect(result).toEqual(undefined)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ message: 'Band not found' })
  })
})
