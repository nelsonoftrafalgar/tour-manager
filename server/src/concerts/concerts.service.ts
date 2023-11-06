import {
  Concert,
  CreateConcertRequest,
  GetConcertResponse,
  UpdateConcertRequest,
} from './concerts.dto'
import { ConflictException, Injectable } from '@nestjs/common'

import { IdCheckerService } from '../../src/idChecker/IdChecker.service'
import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class ConcertsService {
  constructor(
    private prisma: PrismaService,
    private idChecker: IdCheckerService,
  ) {}

  async getConcerts(): Promise<GetConcertResponse[]> {
    return this.prisma.concert.findMany({
      select: {
        id: true,
        place: true,
        date: true,
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async createConcert(data: CreateConcertRequest): Promise<Concert> {
    const { date, place, bandId, tourManagerId } = data
    await this.preventDuplicates(data)

    return this.prisma.concert.create({
      data: {
        id: uuid(),
        date,
        place,
        bandId,
        tourManagerId,
      },
    })
  }

  async updateConcert(data: UpdateConcertRequest): Promise<Concert> {
    const { date, place, bandId, tourManagerId, id } = data
    await this.preventDuplicates(data)
    return this.prisma.concert.update({
      where: { id },
      data: {
        date,
        place,
        bandId,
        tourManagerId,
      },
    })
  }

  async deleteConcert(id: string): Promise<Concert> | null {
    await this.idChecker.checkConcertId(id)
    return this.prisma.concert.delete({ where: { id } })
  }

  async preventDuplicates({
    date,
    place,
    bandId,
    tourManagerId,
  }: UpdateConcertRequest | CreateConcertRequest) {
    const duplicate = await this.prisma.concert.findMany({
      where: {
        date,
        place,
        bandId,
        tourManagerId,
      },
    })

    if (duplicate.length > 0) {
      throw new ConflictException({ message: 'Concert already exists' })
    }
  }
}
