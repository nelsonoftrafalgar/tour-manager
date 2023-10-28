import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  Salary,
  SalaryCreateRequest,
  SalaryDuplicateCheckParams,
  SalaryGetResponse,
  SalaryReport,
  SalaryReportParamsDTO,
  SalaryUpdateRequest,
} from './salaries.dto'

import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class SalariesService {
  constructor(private prisma: PrismaService) {}

  async getSalaries(): Promise<SalaryGetResponse[]> {
    return this.prisma.salary.findMany({
      select: {
        id: true,
        amount: true,
        comment: true,
        band: {
          select: {
            name: true,
            id: true,
          },
        },
        tourManager: {
          select: {
            name: true,
            id: true,
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

  async createSalary(data: SalaryCreateRequest) {
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

  async getReport(query: SalaryReportParamsDTO): Promise<SalaryReport[]> {
    let where: Record<string, string>

    if (query.concertId) {
      where = { concertId: query.concertId }
    }
    if (query.tourManagerId) {
      where = { tourManagerId: query.tourManagerId }
    }
    if (query.bandId) {
      where = { bandId: query.bandId }
    }

    return this.prisma.salary.findMany({
      select: {
        id: true,
        amount: true,
        concert: { select: { place: true } },
        band: { select: { name: true } },
        tourManager: { select: { name: true } },
      },
      where,
    })
  }

  async deleteSalary(id: string) {
    const salary = await this.prisma.salary.findUnique({ where: { id } })

    if (!salary) {
      throw new NotFoundException({ message: `Salary not found` })
    }

    return this.prisma.salary.delete({ where: { id } })
  }

  async updateSalary(data: SalaryUpdateRequest): Promise<Salary> {
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
  }: SalaryDuplicateCheckParams) {
    const duplicates = await this.prisma.salary.findMany({
      where: { comment, amount, concertId, bandId, tourManagerId },
    })

    if (duplicates.length > 0) {
      throw new ConflictException()
    }
  }
}
