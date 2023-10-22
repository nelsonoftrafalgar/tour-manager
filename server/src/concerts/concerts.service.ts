import {
  Concert,
  ConcertDTO,
  ConcertGetResponse,
  NewConcertDTO,
} from './concerts.dto'
import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) {}

  async getConcerts(place?: string): Promise<ConcertGetResponse[]> {
    if (place) {
      return await this.getConcertsByPlace(place)
    }

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
      take: 7,
    })
  }

  async getConcertsByPlace(place: string): Promise<ConcertGetResponse[]> {
    return this.prisma.concert.findMany({
      select: {
        id: true,
        place: true,
        date: true,
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
      },
      where: {
        place,
      },
    })
  }

  async getConcertsByBandId(id: string): Promise<ConcertGetResponse[]> {
    return this.prisma.concert.findMany({
      select: {
        id: true,
        place: true,
        date: true,
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
      },
      where: {
        id,
      },
    })
  }

  async createConcert(data: NewConcertDTO): Promise<Concert> {
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

  async updateConcert(data: ConcertDTO): Promise<Concert> {
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

  async preventDuplicates({
    date,
    place,
    bandId,
    tourManagerId,
  }: NewConcertDTO | ConcertDTO) {
    const duplicate = await this.prisma.concert.findMany({
      where: {
        date,
        place,
        bandId,
        tourManagerId,
      },
    })

    if (duplicate.length > 0) {
      throw new ConflictException()
    }
  }
}
