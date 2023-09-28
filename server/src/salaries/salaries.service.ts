import { ConflictException, Injectable } from '@nestjs/common'
import {
  NewSalaryDTO,
  Salary,
  SalaryDTO,
  SalaryReport,
  SalaryReportParamsDTO,
} from './salaries.dto'

import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class SalariesService {
  constructor(private prisma: PrismaService) {}

  async createSalary(data: NewSalaryDTO): Promise<Salary> {
    const { amount, bandId, tourManagerId, concertId } = data
    await this.preventDuplicates(data)

    return this.prisma.salary.create({
      data: {
        id: uuid(),
        amount,
        bandId,
        tourManagerId,
        concertId,
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
    this.prisma.salary.delete({
      where: { id },
    })
  }

  async updateSalary(data: SalaryDTO): Promise<Salary> {
    const { amount, bandId, concertId, tourManagerId, id } = data
    await this.preventDuplicates(data)
    return this.prisma.salary.update({
      where: { id },
      data: {
        amount,
        bandId,
        concertId,
        tourManagerId,
      },
    })
  }

  async preventDuplicates({
    amount,
    bandId,
    concertId,
    tourManagerId,
  }: SalaryDTO | NewSalaryDTO) {
    const duplicates = await this.prisma.salary.findMany({
      where: { amount, bandId, concertId, tourManagerId },
    })

    if (duplicates.length > 0) {
      throw new ConflictException()
    }
  }
}