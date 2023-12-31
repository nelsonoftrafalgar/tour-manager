import { ConflictException, Injectable } from '@nestjs/common'
import {
  CreateSalaryRequest,
  DuplicateSalaryCheckParams,
  GetSalaryReportRequest,
  GetSalaryResponse,
  Salary,
  SalaryReport,
  UpdateSalaryRequest,
} from './salaries.dto'

import { IdCheckerService } from '../../src/idChecker/IdChecker.service'
import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class SalariesService {
  constructor(
    private prisma: PrismaService,
    private idChecker: IdCheckerService,
  ) {}

  async getSalaries(): Promise<GetSalaryResponse[]> {
    return this.prisma.salary.findMany({
      select: {
        id: true,
        amount: true,
        comment: true,
        band: {
          select: {
            name: true,
          },
        },
        tourManager: {
          select: {
            name: true,
          },
        },
        concert: {
          select: {
            date: true,
            place: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async createSalary(data: CreateSalaryRequest) {
    const { amount, concertId, comment } = data
    const { bandId, tourManagerId } = await this.prisma.concert.findUnique({
      where: { id: concertId },
    })

    await this.preventDuplicates({ ...data, bandId, tourManagerId })

    return this.prisma.salary.create({
      data: {
        id: uuid(),
        amount,
        comment,
        concertId,
        bandId,
        tourManagerId,
      },
    })
  }

  async getReport(query: GetSalaryReportRequest): Promise<SalaryReport[]> {
    let where: Record<string, string | { date: { gte: string; lte: string } }>

    const { date, concertId, tourManagerId, bandId } = query
    const [startDate, endDate] = date.split('_')

    if (concertId) {
      await this.idChecker.checkConcertId(concertId)
      where = { concertId: concertId }
    }
    if (tourManagerId) {
      await this.idChecker.checkTourManagerId(tourManagerId)
      where = { tourManagerId: tourManagerId }
    }
    if (bandId) {
      await this.idChecker.checkBandId(bandId)
      where = { bandId: bandId }
    }

    where = {
      ...where,
      concert: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    }

    return this.prisma.salary.findMany({
      select: {
        id: true,
        amount: true,
        comment: true,
        concert: { select: { place: true, date: true } },
        band: { select: { name: true } },
        tourManager: { select: { name: true } },
      },
      where,
    })
  }

  async deleteSalary(id: string) {
    await this.idChecker.checkSalaryId(id)
    return this.prisma.salary.delete({ where: { id } })
  }

  async updateSalary(data: UpdateSalaryRequest): Promise<Salary> {
    const { amount, concertId, id, comment } = data
    const { bandId, tourManagerId } = await this.prisma.concert.findUnique({
      where: { id: concertId },
    })

    await this.preventDuplicates({
      comment,
      amount,
      concertId,
      bandId,
      tourManagerId,
    })
    return this.prisma.salary.update({
      where: { id },
      data: {
        amount,
        bandId,
        concertId,
        tourManagerId,
        comment,
      },
    })
  }

  async preventDuplicates({
    comment,
    amount,
    concertId,
    bandId,
    tourManagerId,
  }: DuplicateSalaryCheckParams) {
    const duplicates = await this.prisma.salary.findMany({
      where: { comment, amount, concertId, bandId, tourManagerId },
    })

    if (duplicates.length > 0) {
      throw new ConflictException()
    }
  }
}
