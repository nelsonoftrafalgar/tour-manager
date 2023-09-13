import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersModule } from '../../src/tourManagers/tourManagers.module'
import { TourManagersService } from '../../src/tourManagers/tourManagers.service'

describe('TourManagersController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    getTourManagers: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TourManagersModule],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockService)
      .compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    await app.init()
  })

  it('should get all tour managers', () => {
    return request(app.getHttpServer())
      .get('/tour_managers')
      .expect(200)
      .expect({})
  })

  it('should filter tour managers by name', async () => {
    const response = await request(app.getHttpServer())
      .get('/tour_managers')
      .query({ name: 'Sam' })

    expect(response.status).toEqual(200)
    expect(response.text).toEqual('{}')
  })

  it('should validate tour manager name', async () => {
    const response = await request(app.getHttpServer())
      .get('/tour_managers')
      .query({ name: 'Sam!' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })
})
