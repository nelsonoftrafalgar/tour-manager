import { Test, TestingModule } from '@nestjs/testing'

import { BandsService } from '../../src/bands/bands.service'

describe('BandsService', () => {
  let service: BandsService

  const mockService = {
    getBands: jest.fn().mockResolvedValue([
      { id: '1', name: 'Band1', frontMan: 'Frontman1' },
      { id: '2', name: 'Band2', frontMan: 'Frontman2' },
    ]),
    getBandByName: jest
      .fn()
      .mockResolvedValue([
        { id: '1', name: 'Led Zeppelin', frontMan: 'Robert Plant' },
      ]),
    getBandById: jest
      .fn()
      .mockResolvedValue({ id: '1', name: 'Band1', frontMan: 'Frontman1' }),
    createBand: jest
      .fn()
      .mockResolvedValue({ id: '3', name: 'NewBand', frontMan: 'NewFrontman' }),
    updateBand: jest.fn().mockResolvedValue({
      id: '1',
      name: 'UpdatedBand',
      frontMan: 'UpdatedFrontman',
    }),
    preventDuplicates: jest.fn().mockResolvedValue({}),
    getBandNames: jest.fn().mockResolvedValue(['Band1', 'Band2']),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BandsService],
    })
      .overrideProvider(BandsService)
      .useValue(mockService)
      .compile()

    service = module.get<BandsService>(BandsService)
  })

  it('should get all bands', async () => {
    const result = await service.getBands()
    expect(result).toEqual([
      { id: '1', name: 'Band1', frontMan: 'Frontman1' },
      { id: '2', name: 'Band2', frontMan: 'Frontman2' },
    ])
  })

  it('should get bands filtered by name', async () => {
    const result = await service.getBandByName('Led')
    expect(result).toEqual([
      { id: '1', name: 'Led Zeppelin', frontMan: 'Robert Plant' },
    ])
  })

  it('should get band by id', async () => {
    const result = await service.getBandById('1')
    expect(result).toEqual({ id: '1', name: 'Band1', frontMan: 'Frontman1' })
  })

  it('should create new band', async () => {
    const newBandData = { name: 'NewBand', frontMan: 'NewFrontman' }
    const result = await service.createBand(newBandData)
    expect(result).toEqual({ id: '3', ...newBandData })
  })

  it('should update band', async () => {
    const updatedBandData = {
      id: '1',
      name: 'UpdatedBand',
      frontMan: 'UpdatedFrontman',
    }
    const result = await service.updateBand(updatedBandData)
    expect(result).toEqual(updatedBandData)
  })

  it('should prevent duplicates in db', async () => {
    const dataToCheck = { name: 'Band1', frontMan: 'Frontman1' }
    const result = await service.preventDuplicates(dataToCheck)
    expect(result).toEqual({})
  })

  it('should get all band names', async () => {
    const result = await service.getBandNames()
    expect(result).toEqual(['Band1', 'Band2'])
  })
})
