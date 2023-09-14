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
    getConcerts: () => [MOCK_PLACE],
    getConcertsByBandId: () => [MOCK_PLACE],
    createConcert: () => ({
      date: MOCK_DATE,
      place: MOCK_PLACE,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
    }),
    updateConcert: () => ({
      id: MOCK_CONCERT_ID,
      date: MOCK_DATE,
      place: MOCK_PLACE,
      bandId: MOCK_BAND_ID,
      tourManagerId: MOCK_TOUR_MANAGER_ID,
    }),
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
    return request(app.getHttpServer())
      .get('/concerts')
      .expect(200)
      .expect(mockService.getConcerts())
  })

  it('should filter concerts by place', async () => {
    await request(app.getHttpServer())
      .get('/concerts')
      .query({ place: MOCK_PLACE })
      .expect(200)
      .expect(mockService.getConcerts())
  })

  it('should validate concert place', async () => {
    await request(app.getHttpServer())
      .get('/concerts')
      .query({ place: `${MOCK_PLACE}!` })
      .expect(400)
  })

  it('should get concert by band id', () => {
    return request(app.getHttpServer())
      .get(`/concerts/${MOCK_CONCERT_ID}`)
      .expect(200)
      .expect(mockService.getConcertsByBandId())
  })

  it('should validate band id', async () => {
    await request(app.getHttpServer())
      .get('/concerts')
      .query({ id: `${MOCK_CONCERT_ID}!` })
      .expect(400)
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
      .expect(mockService.createConcert())
  })

  it('should validate new concert data', async () => {
    await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: MOCK_DATE,
        place: `${MOCK_PLACE}!`,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: `${MOCK_DATE}!`,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}*`,
      })
      .expect(400)
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
      .expect(mockService.updateConcert())
  })

  it('should validate updated concert data', async () => {
    await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: `${MOCK_DATE}!`,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: `${MOCK_PLACE}!`,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: `${MOCK_BAND_ID}^`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}#`,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/concerts')
      .send({
        date: MOCK_DATE,
        place: MOCK_PLACE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: `${MOCK_CONCERT_ID}!`,
      })
      .expect(400)
  })
})
