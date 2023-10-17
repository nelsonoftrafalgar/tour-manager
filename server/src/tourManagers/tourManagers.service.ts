import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  NewTourManagerDTO,
  TourManager,
  TourManagerDTO,
} from './tourManagers.dto'

import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class TourManagersService {
  constructor(private prisma: PrismaService) {}
  async getTourManagers(name?: string): Promise<TourManager[]> {
    if (name) {
      return this.getTourManagersByName(name)
    }
    return this.prisma.tourManager.findMany()
  }
  async getTourManagersByName(name?: string): Promise<TourManager[]> {
    return this.prisma.tourManager.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }

  async updateTourManager(data: TourManagerDTO): Promise<TourManager> {
    const { name, id } = data
    await this.preventDuplicates(data)
    return this.prisma.tourManager.update({
      where: { id },
      data: {
        name,
      },
    })
  }

  async createTourManager(data: NewTourManagerDTO): Promise<TourManager> {
    const { name } = data
    await this.preventDuplicates(data)
    return this.prisma.tourManager.create({
      data: {
        id: uuid(),
        name,
      },
    })
  }

  async deleteTourManager(id: string): Promise<TourManager> | null {
    const band = await this.prisma.tourManager.findUnique({ where: { id } })

    if (!band) {
      throw new NotFoundException({ message: `Tour manager not found` })
    }

    return this.prisma.tourManager.delete({ where: { id } })
  }

  async preventDuplicates(data: NewTourManagerDTO) {
    const { name } = data
    const duplicate = await this.prisma.tourManager.findMany({
      where: { name },
    })

    if (duplicate.length > 0) {
      throw new ConflictException({ message: 'Tour manager already exists' })
    }
  }
}
