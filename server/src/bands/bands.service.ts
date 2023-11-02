import { Band, CreateBandRequest, UpdateBandRequest } from './bands.dto'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class BandsService {
  constructor(private prisma: PrismaService) {}

  async getBands(): Promise<Band[]> {
    return this.prisma.band.findMany()
  }

  async createBand(data: CreateBandRequest): Promise<Band> {
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

  async updateBand(data: UpdateBandRequest): Promise<Band> {
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

  async deleteBand(id: string): Promise<Band> | null {
    const band = await this.prisma.band.findUnique({ where: { id } })

    if (!band) {
      throw new NotFoundException({ message: `Band not found` })
    }

    return this.prisma.band.delete({ where: { id } })
  }

  async preventDuplicates(data: CreateBandRequest | UpdateBandRequest) {
    const { name, frontMan } = data
    const duplicate = await this.prisma.band.findMany({
      where: { name, frontMan },
    })

    if (duplicate.length > 0) {
      throw new ConflictException({ message: 'Band already exists' })
    }
  }
}
