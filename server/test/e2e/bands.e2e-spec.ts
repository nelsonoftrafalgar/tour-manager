import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import {
  MOCK_BAND_ID,
  MOCK_BAND_NAME,
  MOCK_DATE,
  MOCK_FRONTMAN,
  mockBandService,
} from 'test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { BandsModule } from 'src/bands/bands.module'
import { BandsService } from 'src/bands/bands.service'

describe('BandsController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BandsModule],
    })
      .overrideProvider(BandsService)
      .useValue(mockBandService)
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

  it('should get all bands', () => {
    return request(app.getHttpServer())
      .get('/bands')
      .expect(200)
      .expect(mockBandService.getBands())
  })

  it('should filter bands by name', async () => {
    await request(app.getHttpServer())
      .get('/bands')
      .query({ name: 'Led' })
      .expect(200)
      .expect(mockBandService.getBands())
  })

  it('should validate band name', async () => {
    await request(app.getHttpServer())
      .get('/bands')
      .query({ name: 'Led!' })
      .expect(400)
  })

  it('should get all band names', () => {
    return request(app.getHttpServer())
      .get('/bands/all_names')
      .expect(200)
      .expect(mockBandService.getBandNames())
  })

  it('should get band by id', () => {
    return request(app.getHttpServer())
      .get(`/bands/${MOCK_BAND_ID}`)
      .expect(200)
      .expect(mockBandService.getBandById())
  })

  it('should validate band id', async () => {
    await request(app.getHttpServer())
      .get('/bands')
      .query({ id: `${MOCK_BAND_ID}!` })
      .expect(400)
  })

  it('should create new band', () => {
    return request(app.getHttpServer())
      .post('/bands')
      .send({
        name: MOCK_BAND_NAME,
        frontMan: MOCK_FRONTMAN,
      })
      .expect(201)
      .expect(mockBandService.createBand())
  })

  it('should validate new band data', async () => {
    await request(app.getHttpServer())
      .post('/bands')
      .send({
        name: `${MOCK_BAND_NAME} `,
        frontMan: MOCK_FRONTMAN,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/bands')
      .send({
        name: MOCK_BAND_NAME,
        frontMan: `${MOCK_FRONTMAN} `,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/bands')
      .send({
        name: `${MOCK_BAND_NAME} ?`,
        frontMan: MOCK_FRONTMAN,
      })
      .expect(400)

    await request(app.getHttpServer())
      .post('/bands')
      .send({
        name: MOCK_BAND_NAME,
        frontMan: `${MOCK_FRONTMAN} ?`,
      })
      .expect(400)
  })

  it('should update band', () => {
    return request(app.getHttpServer())
      .put('/bands')
      .send({
        id: MOCK_BAND_ID,
        name: MOCK_BAND_NAME,
        frontMan: MOCK_FRONTMAN,
      })
      .expect(200)
      .expect(mockBandService.updateBand())
  })

  it('should validate updated band data', async () => {
    await request(app.getHttpServer())
      .put('/bands')
      .send({
        name: MOCK_BAND_NAME,
        frontMan: MOCK_FRONTMAN,
        bandId: MOCK_BAND_ID,
        createdAt: `${MOCK_DATE}!`,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/bands')
      .send({
        name: `${MOCK_BAND_NAME} `,
        frontMan: MOCK_FRONTMAN,
        bandId: MOCK_BAND_ID,
        createdAt: `${MOCK_DATE}!`,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/bands')
      .send({
        name: MOCK_BAND_NAME,
        frontMan: `${MOCK_FRONTMAN} `,
        bandId: MOCK_BAND_ID,
        createdAt: `${MOCK_DATE}!`,
      })
      .expect(400)

    await request(app.getHttpServer())
      .put('/bands')
      .send({
        name: MOCK_BAND_NAME,
        frontMan: MOCK_FRONTMAN,
        bandId: MOCK_BAND_ID,
        createdAt: `${MOCK_DATE}!`,
      })
      .expect(400)
  })
})
