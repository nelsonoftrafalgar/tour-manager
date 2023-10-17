import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import {
  MOCK_DATE,
  MOCK_TOUR_MANAGER_ID,
  MOCK_TOUR_MANAGER_NAME,
  mockTourManagerService,
} from 'test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersModule } from '../../src/tourManagers/tourManagers.module'
import { TourManagersService } from '../../src/tourManagers/tourManagers.service'

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

  it('should create new tour manager', () => {
    return request(app.getHttpServer())
      .post('/tour_managers')
      .send({
        name: MOCK_TOUR_MANAGER_NAME,
      })
      .expect(201)
      .expect({
        message: 'Tour manager has been successfully created',
        data: mockTourManagerService.createTourManager(),
      })
  })

  it('should validate new tour manager data', async () => {
    await request(app.getHttpServer())
      .post('/tour_managers')
      .send({
        name: `${MOCK_TOUR_MANAGER_NAME} `,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/tour_managers')
      .send({
        name: `${MOCK_TOUR_MANAGER_NAME} ?`,
      })
      .expect(400)
  })

  it('should update tour manager', () => {
    return request(app.getHttpServer())
      .put('/tour_managers')
      .send({
        id: MOCK_TOUR_MANAGER_ID,
        name: MOCK_TOUR_MANAGER_NAME,
      })
      .expect(200)
      .expect({
        message: 'Tour manager has been successfully updated',
        data: mockTourManagerService.updateTourManager(),
      })
  })

  it('should validate updated tour manager data', async () => {
    await request(app.getHttpServer())
      .put('/tour_managers')
      .send({
        name: MOCK_TOUR_MANAGER_NAME,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        createdAt: `${MOCK_DATE}!`,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/tour_managers')
      .send({
        name: `${MOCK_TOUR_MANAGER_NAME} `,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        createdAt: `${MOCK_DATE}!`,
      })
      .expect(400)
  })

  it('should delete tour manager', async () => {
    await request(app.getHttpServer())
      .delete(`/tour_managers/${MOCK_TOUR_MANAGER_ID}`)
      .expect(200)
  })
})
