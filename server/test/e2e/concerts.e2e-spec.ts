import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import {
  MOCK_BAND_ID,
  MOCK_CONCERT_ID,
  MOCK_DATE,
  MOCK_PLACE,
  MOCK_TOUR_MANAGER_ID,
} from 'test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { ConcertsModule } from 'src/concerts/concerts.module'
import { ConcertsService } from 'src/concerts/concerts.service'

describe('ConcertsController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    getConcerts: jest.fn().mockResolvedValue({}),
    getConcertsByBandId: jest.fn().mockResolvedValue({}),
    createConcert: jest.fn().mockResolvedValue({}),
    updateConcert: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConcertsModule],
    })
      .overrideProvider(ConcertsService)
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

  it('should get all concerts', () => {
    return request(app.getHttpServer()).get('/concerts').expect(200).expect({})
  })

  it('should filter concerts by place', async () => {
    const response = await request(app.getHttpServer())
      .get('/concerts')
      .query({ place: MOCK_PLACE })

    expect(response.status).toEqual(200)
    expect(response.text).toEqual('{}')
  })

  it('should validate concert place', async () => {
    const response = await request(app.getHttpServer())
      .get('/concerts')
      .query({ place: `${MOCK_PLACE}!` })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should get concert by band id', () => {
    return request(app.getHttpServer())
      .get(`/concerts/${MOCK_CONCERT_ID}`)
      .expect(200)
      .expect({})
  })

  it('should validate band id', async () => {
    const response = await request(app.getHttpServer())
      .get('/concerts')
      .query({ id: `${MOCK_CONCERT_ID}!` })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should create new concert', () => {
    return request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })
      .expect(201)
      .expect({})
  })

  it('should validate new concert data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: MOCK_DATE,
        place: `${MOCK_PLACE}!`,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: `${MOCK_DATE}!`,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}*`,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should update concert', () => {
    return request(app.getHttpServer())
      .put('/concerts')
      .send({
        id: MOCK_CONCERT_ID,
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })
      .expect(200)
      .expect({})
  })

  it('should validate updated concert data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: `${MOCK_DATE}!`,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: `${MOCK_PLACE}!`,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: `${MOCK_BAND_ID}^`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}#`,
        concertId: MOCK_CONCERT_ID,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })
})
