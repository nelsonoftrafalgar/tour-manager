import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import {
  MOCK_AMOUNT,
  MOCK_BAND_ID,
  MOCK_CONCERT_ID,
  MOCK_SALARY_ID,
  MOCK_TOUR_MANAGER_ID,
} from 'test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { SalariesModule } from 'src/salaries/salaries.module'
import { SalariesService } from 'src/salaries/salaries.service'

describe('SalariesController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    createSalary: jest.fn().mockResolvedValue({}),
    getReport: jest.fn().mockResolvedValue({}),
    updateSalary: jest.fn().mockResolvedValue({}),
    deleteSalary: jest.fn().mockResolvedValue({}),
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
      .expect({})
  })

  it('should validate report params', async () => {
    let response: request.Response
    response = await request(app.getHttpServer())
      .get('/salaries')
      .query({
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .get('/salaries')
      .query({
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}!`,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .get('/salaries')
      .query({
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
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
      .expect({})
  })

  it('should validate new salary data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: `${MOCK_AMOUNT} `,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: MOCK_AMOUNT,
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}!`,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
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
      .expect({})
  })

  it('should validate updated salary data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: `${MOCK_SALARY_ID}!`,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}!`,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: MOCK_AMOUNT,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/salaries')
      .send({
        id: MOCK_SALARY_ID,
        amount: `${MOCK_AMOUNT} `,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should delete salary', () => {
    return request(app.getHttpServer())
      .delete('/salaries')
      .send({ id: MOCK_SALARY_ID })
      .expect(200)
      .expect({})
  })

  it('should validate delete salary id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/salaries')
      .send({ id: `${MOCK_SALARY_ID}!` })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })
})
