import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersModule } from '../../src/tourManagers/tourManagers.module'
import { TourManagersService } from '../../src/tourManagers/tourManagers.service'
import { mockTourManagerService } from 'test/mocks'

describe('TourManagersController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TourManagersModule],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockTourManagerService)
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
      .expect(mockTourManagerService.getTourManagers())
  })

  it('should filter tour managers by name', async () => {
    await request(app.getHttpServer())
      .get('/tour_managers')
      .query({ name: 'Sam' })
      .expect(mockTourManagerService.getTourManagers())
  })

  it('should validate tour manager name', async () => {
    await request(app.getHttpServer())
      .get('/tour_managers')
      .query({ name: 'Sam!' })
      .expect(400)
  })
})
