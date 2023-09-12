import { Band, BandDTO, BandName, NewBandDTO } from './bands.dto'
import { ConflictException, Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class BandsService {
  constructor(private prisma: PrismaService) {}

  async getBands(name?: string): Promise<Band[]> {
    if (name) {
      return this.getBandByName(name)
    }
    return this.prisma.band.findMany()
  }

  async getBandByName(name: string): Promise<Band[]> {
    return this.prisma.band.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }

  async getBandById(id: string): Promise<Band[]> {
    return this.prisma.band.findMany({
      where: {
        id,
      },
    })
  }

  async createBand(data: NewBandDTO): Promise<Band> {
    const { name, frontMan } = data
    await this.preventDuplicates(data)
    return this.prisma.band.create({
      data: {
        id: uuid(),
        name,
        frontMan,
      },
    })
  }

  async updateBand(data: BandDTO): Promise<Band> {
    const { name, frontMan, id } = data
    await this.preventDuplicates(data)
    return this.prisma.band.update({
      where: { id },
      data: {
        name,
        frontMan,
      },
    })
  }

  async preventDuplicates(data: NewBandDTO | BandDTO) {
    const { name, frontMan } = data
    const duplicate = await this.prisma.band.findMany({
      where: { name, frontMan },
    })

    if (duplicate.length > 0) {
      throw new ConflictException()
    }
  }

  async getBandNames(): Promise<BandName[]> {
    return this.prisma.band.findMany({ select: { id: true, name: true } })
  }
}
