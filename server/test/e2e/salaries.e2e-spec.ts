import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import {
  MOCK_AMOUNT,
  MOCK_BAND_ID,
  MOCK_BAND_NAME,
  MOCK_CONCERT_ID,
  MOCK_PLACE,
  MOCK_SALARY_ID,
  MOCK_TOUR_MANAGER_ID,
  MOCK_TOUR_MANAGER_NAME,
} from 'test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { SalariesModule } from 'src/salaries/salaries.module'
import { SalariesService } from 'src/salaries/salaries.service'

describe('SalariesController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    createSalary: () => ({
      amount: MOCK_AMOUNT,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
      concertId: MOCK_CONCERT_ID,
    }),
    getReport: () => ({
      id: MOCK_SALARY_ID,
      amount: MOCK_AMOUNT,
      place: MOCK_PLACE,
      bandName: MOCK_BAND_NAME,
      tourManagerName: MOCK_TOUR_MANAGER_NAME,
    }),
    updateSalary: () => ({
      id: MOCK_SALARY_ID,
      amount: MOCK_AMOUNT,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
      concertId: MOCK_CONCERT_ID,
    }),
    deleteSalary: () => {},
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SalariesModule],
    })
      .overrideProvider(SalariesService)
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

  it('should get report', () => {
    return request(app.getHttpServer())
      .get('/salaries')
      .query({
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(200)
      .expect(mockService.getReport())
  })

  it('should validate report params', async () => {
    await request(app.getHttpServer())
      .get('/salaries')
      .query({
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .get('/salaries')
      .query({
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}!`,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .get('/salaries')
      .query({
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })
      .expect(400)
  })

  it('should create new salary', () => {
    return request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(201)
      .expect(mockService.createSalary())
  })

  it('should validate new salary data', async () => {
    await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: `${MOCK_AMOUNT} `,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: MOCK_AMOUNT,
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}!`,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })
      .expect(400)
  })

  it('should update salary', () => {
    return request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(200)
      .expect(mockService.updateSalary())
  })

  it('should validate updated salary data', async () => {
    await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: `${MOCK_SALARY_ID}!`,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}!`,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: `${MOCK_AMOUNT} `,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)
  })

  it('should delete salary', () => {
    return request(app.getHttpServer())
      .delete('/salaries')
      .send({ id: MOCK_SALARY_ID })
      .expect(200)
      .expect({})
  })

  it('should validate delete salary id', async () => {
    await request(app.getHttpServer())
      .delete('/salaries')
      .send({ id: `${MOCK_SALARY_ID}!` })
      .expect(400)
  })
})
