import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { MOCK_CONCERT_ID, mockConcertService } from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { Concert } from 'src/concerts/concerts.dto'
import { ConcertsController } from '../../src/concerts/concerts.controller'
import { ConcertsService } from '../../src/concerts/concerts.service'
import { Response } from 'express'

describe('ConcertsController', () => {
  let controller: ConcertsController
  let concertService: ConcertsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [ConcertsService],
    })
      .overrideProvider(ConcertsService)
      .useValue(mockConcertService)
      .compile()

    controller = module.get<ConcertsController>(ConcertsController)
    concertService = module.get<ConcertsService>(ConcertsService)
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

  it('should create a new concert and return a success response', async () => {
    const newConcertData = mockConcertService.createConcert() as Concert
    const response = {
      message: 'Concert has been successfully created',
      data: newConcertData,
    }

    jest
      .spyOn(concertService, 'createConcert')
      .mockResolvedValue(newConcertData)
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await controller.createConcert(newConcertData, res as Response)
    expect(concertService.createConcert).toHaveBeenCalledWith(newConcertData)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith(response)
  })

  it('should handle a create conflict and return a conflict response', async () => {
    const newConcertData = mockConcertService.createConcert()

    const concertCreateSpy = jest
      .spyOn(concertService, 'createConcert')
      .mockRejectedValue(new ConflictException('Concert already exists'))

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    await controller.createConcert(newConcertData, res as Response)

    expect(concertCreateSpy).toHaveBeenCalledWith(newConcertData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Concert already exists',
    })
  })

  it('should update a concert and return a success response', async () => {
    const updatedConcert = mockConcertService.updateConcert() as Concert

    jest
      .spyOn(concertService, 'updateConcert')
      .mockResolvedValue(updatedConcert)

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    await controller.updateConcert(updatedConcert, res as Response)

    expect(concertService.updateConcert).toHaveBeenCalledWith(updatedConcert)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Concert has been successfully updated',
      data: updatedConcert,
    })
  })

  it('should handle a update conflict and return a conflict response', async () => {
    const updateConcertData = mockConcertService.updateConcert()

    const concertUpdateSpy = jest
      .spyOn(concertService, 'updateConcert')
      .mockRejectedValue(new ConflictException('Concert already exists'))

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    await controller.updateConcert(updateConcertData, res as Response)

    expect(concertUpdateSpy).toHaveBeenCalledWith(updateConcertData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Concert already exists',
    })
  })

  it('should delete a concert and return a success message', async () => {
    const id = MOCK_CONCERT_ID

    const deleteConcertSpy = jest
      .spyOn(concertService, 'deleteConcert')
      .mockResolvedValue({ place: 'Test concert place' } as Concert)

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await controller.deleteConcert({ id }, res as Response)

    expect(deleteConcertSpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Concert has been successfully deleted',
    })
  })

  it('should return a not found response if the concert is not found', async () => {
    const id = MOCK_CONCERT_ID

    const deleteConcertSpy = jest
      .spyOn(concertService, 'deleteConcert')
      .mockRejectedValue(new NotFoundException('Concert not found'))

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await controller.deleteConcert({ id }, res as Response)

    expect(deleteConcertSpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Concert not found' })
  })
})
