import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import {
  MOCK_AMOUNT,
  MOCK_BAND_ID,
  MOCK_COMMENT,
  MOCK_CONCERT_ID,
  MOCK_DATE,
  MOCK_SALARY_ID,
  MOCK_TOUR_MANAGER_ID,
  mockSalaryService,
} from 'test/mocks'
import { Test, TestingModule } from '@nestjs/testing'

import { SalariesModule } from 'src/salaries/salaries.module'
import { SalariesService } from 'src/salaries/salaries.service'

describe('SalariesController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SalariesModule],
    })
      .overrideProvider(SalariesService)
      .useValue(mockSalaryService)
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
      .get('/salaries/report')
      .query({
        date: MOCK_DATE,
        bandId: MOCK_BAND_ID,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(200)
      .expect(mockSalaryService.getReport())
  })

  it('should validate report params', async () => {
    await request(app.getHttpServer())
      .get('/salaries/report')
      .query({
        date: MOCK_DATE,
        bandId: `${MOCK_BAND_ID}!`,
        tourManagerId: MOCK_TOUR_MANAGER_ID,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .get('/salaries/report')
      .query({
        date: MOCK_DATE,
        bandId: MOCK_BAND_ID,
        tourManagerId: `${MOCK_TOUR_MANAGER_ID}!`,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(400)

    await request(app.getHttpServer())
      .get('/salaries/report')
      .query({
        date: MOCK_DATE,
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
        comment: MOCK_COMMENT,
        concertId: MOCK_CONCERT_ID,
      })
      .expect(201)
      .expect({
        message: 'Salary has been successfully created',
      })
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
        concertId: MOCK_CONCERT_ID,
        comment: MOCK_COMMENT,
      })
      .expect(200)
      .expect({
        data: mockSalaryService.updateSalary(),
        message: 'Salary has been successfully updated',
      })
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
      .delete(`/salaries/${MOCK_SALARY_ID}`)
      .expect(200)
      .expect({ message: 'Salary has been successfully deleted' })
  })

  it('should validate delete salary id', async () => {
    await request(app.getHttpServer())
      .delete(`/salaries/${MOCK_SALARY_ID}!`)
      .expect(400)
  })
})
