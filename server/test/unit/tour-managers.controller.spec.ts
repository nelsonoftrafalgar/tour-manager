import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import {
  MOCK_TOUR_MANAGER_ID,
  MOCK_TOUR_MANAGER_NAME,
  mockTourManagerService,
} from '../../test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { Response } from 'express'
import { TourManager } from 'src/tourManagers/tourManagers.dto'
import { TourManagersController } from '../../src/tourManagers/tourManagers.controller'
import { TourManagersService } from '../../src/tourManagers/tourManagers.service'

describe('TourManagersController', () => {
  let controller: TourManagersController
  let tourManagerService: TourManagersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourManagersController],
      providers: [TourManagersService],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockTourManagerService)
      .compile()

    controller = module.get<TourManagersController>(TourManagersController)
    tourManagerService = module.get<TourManagersService>(TourManagersService)
  })

  it('should be able to get tour managers list', () => {
    expect(
      controller.getTourManagers({ name: MOCK_TOUR_MANAGER_NAME }),
    ).toMatchObject(mockTourManagerService.getTourManagers())
  })

  it('should create a new tour manager and return a success response', async () => {
    const newTourManagerData =
      mockTourManagerService.createTourManager() as TourManager
    const response = {
      message: 'Tour manager has been successfully created',
      data: newTourManagerData,
    }

    jest
      .spyOn(tourManagerService, 'createTourManager')
      .mockResolvedValue(newTourManagerData)
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await controller.createTourManager(newTourManagerData, res as Response)
    expect(tourManagerService.createTourManager).toHaveBeenCalledWith(
      newTourManagerData,
    )
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith(response)
  })

  it('should handle a create conflict and return a conflict response', async () => {
    const newTourManagerData = mockTourManagerService.createTourManager()

    const TourManagerCreateSpy = jest
      .spyOn(tourManagerService, 'createTourManager')
      .mockRejectedValue(new ConflictException('Tour manager already exists'))

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    await controller.createTourManager(newTourManagerData, res as Response)

    expect(TourManagerCreateSpy).toHaveBeenCalledWith(newTourManagerData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tour manager already exists',
    })
  })

  it('should update a tour manager and return a success response', async () => {
    const updatedTourManager =
      mockTourManagerService.updateTourManager() as TourManager

    jest
      .spyOn(tourManagerService, 'updateTourManager')
      .mockResolvedValue(updatedTourManager)

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    await controller.updateTourManager(updatedTourManager, res as Response)

    expect(tourManagerService.updateTourManager).toHaveBeenCalledWith(
      updatedTourManager,
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tour manager has been successfully updated',
      data: updatedTourManager,
    })
  })

  it('should handle a update conflict and return a conflict response', async () => {
    const updateTourManagerData = mockTourManagerService.updateTourManager()

    const tourManagerUpdateSpy = jest
      .spyOn(tourManagerService, 'updateTourManager')
      .mockRejectedValue(new ConflictException('Tour manager already exists'))

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    await controller.updateTourManager(updateTourManagerData, res as Response)

    expect(tourManagerUpdateSpy).toHaveBeenCalledWith(updateTourManagerData)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tour manager already exists',
    })
  })

  it('should delete  tour manager and return a success message', async () => {
    const id = MOCK_TOUR_MANAGER_ID

    const deleteTourManagerSpy = jest
      .spyOn(tourManagerService, 'deleteTourManager')
      .mockResolvedValue({ name: 'Test Tour manager' } as TourManager)

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await controller.deleteTourManager({ id }, res as Response)

    expect(deleteTourManagerSpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test Tour manager has been successfully deleted',
    })
  })

  it('should return a not found response if the band is not found', async () => {
    const id = MOCK_TOUR_MANAGER_ID

    const deleteTourManagerSpy = jest
      .spyOn(tourManagerService, 'deleteTourManager')
      .mockRejectedValue(new NotFoundException('Tour manager not found'))

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await controller.deleteTourManager({ id }, res as Response)

    expect(deleteTourManagerSpy).toHaveBeenCalledWith(id)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Tour manager not found' })
  })
})
