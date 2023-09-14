import { Test, TestingModule } from '@nestjs/testing'

import { BandsController } from '../../src/bands/bands.controller'
import { BandsService } from '../../src/bands/bands.service'

describe('BandsController', () => {
  let controller: BandsController
  const mockService = {
    getBands: jest.fn(() => [{ id: 1, name: 'Band1' }]),
    getBandNames: jest.fn(() => ['Band1', 'Band2']),
    getBandById: jest.fn((id) => ({ id, name: 'Band1' })),
    createBand: jest.fn((data) => ({ ...data, id: 2 })),
    updateBand: jest.fn((data) => ({ ...data })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BandsController],
      providers: [BandsService],
    })
      .overrideProvider(BandsService)
      .useValue(mockService)
      .compile()

    controller = module.get<BandsController>(BandsController)
  })

  it('should be able to get bands list', () => {
    const result = controller.getBands({ name: undefined })
    expect(result).toEqual([{ id: 1, name: 'Band1' }])
  })

  it('should be able to get all band names', () => {
    const result = controller.getBandNames()
    expect(result).toEqual(['Band1', 'Band2'])
  })

  it('should be able to get band by id', () => {
    const result = controller.getBandById({ id: '1' })
    expect(result).toEqual({ id: '1', name: 'Band1' })
  })

  it('should be able to create new band', () => {
    const newBand = { name: 'NewBand', frontMan: 'FrontMan' }
    const result = controller.createBand(newBand)
    expect(result).toEqual({ ...newBand, id: 2 })
  })

  it('should be able to update band', () => {
    const bandData = {
      id: '1',
      name: 'UpdatedBand',
      frontMan: 'UpdatedFrontMan',
    }
    const result = controller.updateBand(bandData)
    expect(result).toEqual({ ...bandData })
  })
})
