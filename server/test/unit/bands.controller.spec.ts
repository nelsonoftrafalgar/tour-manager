import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { MOCK_BAND_ID, mockBandService } from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { Band } from 'src/bands/bands.dto'
import { BandsController } from '../../src/bands/bands.controller'
import { BandsService } from '../../src/bands/bands.service'
import { Response } from 'express'

describe('BandsController', () => {
  let controller: BandsController
  let bandsService: BandsService

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }

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
    const result = controller.getBands()
    expect(result).toEqual(mockBandService.getBands())
  })

  it('should create a new band and return a success response', async () => {
    const newBandData = mockBandService.createBand() as Band
    const response = {
      message: 'Band has been successfully created',
      data: newBandData,
    }

    jest.spyOn(bandsService, 'createBand').mockResolvedValue(newBandData)

    await controller.createBand(newBandData, res as Response)
    expect(bandsService.createBand).toHaveBeenCalledWith(newBandData)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith(response)
  })

  it('should handle a create conflict and return a conflict response', async () => {
    const newBandData = mockBandService.createBand()

    const bandCreateSpy = jest
      .spyOn(bandsService, 'createBand')
      .mockRejectedValue(new ConflictException('Band already exists'))

    await controller.createBand(newBandData, res as Response)

    expect(bandCreateSpy).toHaveBeenCalledWith(newBandData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Band already exists',
    })
  })

  it('should update a band and return a success response', async () => {
    const updatedBand = mockBandService.updateBand() as Band

    jest.spyOn(bandsService, 'updateBand').mockResolvedValue(updatedBand)

    await controller.updateBand(updatedBand, res as Response)

    expect(bandsService.updateBand).toHaveBeenCalledWith(updatedBand)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Band has been successfully updated',
      data: updatedBand,
    })
  })

  it('should handle a update conflict and return a conflict response', async () => {
    const updateBandData = mockBandService.updateBand()

    const bandUpdateSpy = jest
      .spyOn(bandsService, 'updateBand')
      .mockRejectedValue(new ConflictException('Band already exists'))

    await controller.updateBand(updateBandData, res as Response)

    expect(bandUpdateSpy).toHaveBeenCalledWith(updateBandData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Band already exists',
    })
  })

  it('should delete a band and return a success message', async () => {
    const id = MOCK_BAND_ID

    const deleteBandSpy = jest
      .spyOn(bandsService, 'deleteBand')
      .mockResolvedValue({ name: 'Test Band' } as Band)

    await controller.deleteBand({ id }, res as Response)

    expect(deleteBandSpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test Band has been successfully deleted',
    })
  })

  it('should return a not found response if the band is not found', async () => {
    const id = MOCK_BAND_ID

    const deleteBandSpy = jest
      .spyOn(bandsService, 'deleteBand')
      .mockRejectedValue(new NotFoundException('Band not found'))

    await controller.deleteBand({ id }, res as Response)

    expect(deleteBandSpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Band not found' })
  })
})
