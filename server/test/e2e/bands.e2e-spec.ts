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

  it('should create new band', () => {
    return request(app.getHttpServer())
      .post('/bands')
      .send({
        name: MOCK_BAND_NAME,
        frontMan: MOCK_FRONTMAN,
      })
      .expect(201)
      .expect({
        message: 'Band has been successfully created',
        data: mockBandService.createBand(),
      })
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
      .expect({
        message: 'Band has been successfully updated',
        data: mockBandService.updateBand(),
      })
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

  it('should delete band', async () => {
    await request(app.getHttpServer())
      .delete(`/bands/${MOCK_BAND_ID}`)
      .expect(200)
  })
})
