import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { TourManager } from './tourManagers.dto'

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
}
