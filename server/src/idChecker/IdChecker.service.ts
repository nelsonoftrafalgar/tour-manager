import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../src/prisma/prisma.service'

@Injectable()
export class IdCheckerService {
  constructor(private prisma: PrismaService) {}

  async checkConcertId(id: string) {
    const concert = await this.prisma.concert.findUnique({
      where: { id },
    })
    if (!concert) {
      throw new NotFoundException({ message: `Concert not found` })
    }
  }

  async checkBandId(id: string) {
    const band = await this.prisma.band.findUnique({
      where: { id },
    })
    if (!band) {
      throw new NotFoundException({ message: `Band not found` })
    }
  }

  async checkTourManagerId(id: string) {
    const tourManager = await this.prisma.tourManager.findUnique({
      where: { id },
    })
    if (!tourManager) {
      throw new NotFoundException({ message: `Tour manager not found` })
    }
  }

  async checkSalaryId(id: string) {
    const salary = await this.prisma.salary.findUnique({ where: { id } })

    if (!salary) {
      throw new NotFoundException({ message: `Salary not found` })
    }
  }
}
