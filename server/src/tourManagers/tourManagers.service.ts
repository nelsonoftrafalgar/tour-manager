import { ConflictException, Injectable } from '@nestjs/common'
import {
  CreateTourManagerRequest,
  TourManager,
  UpdateTourManagerRequest,
} from './tourManagers.dto'

import { IdCheckerService } from '../../src/idChecker/IdChecker.service'
import { PrismaService } from '../../src/prisma/prisma.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class TourManagersService {
  constructor(
    private prisma: PrismaService,
    private idChecker: IdCheckerService,
  ) {}
  async getTourManagers(): Promise<TourManager[]> {
    return this.prisma.tourManager.findMany()
  }

  async updateTourManager(
    data: UpdateTourManagerRequest,
  ): Promise<TourManager> {
    const { name, id } = data
    await this.preventDuplicates(data)
    return this.prisma.tourManager.update({
      where: { id },
      data: {
        name,
      },
    })
  }

  async createTourManager(
    data: CreateTourManagerRequest,
  ): Promise<TourManager> {
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
    await this.idChecker.checkTourManagerId(id)

    return this.prisma.tourManager.delete({ where: { id } })
  }

  async preventDuplicates(
    data: CreateTourManagerRequest | UpdateTourManagerRequest,
  ) {
    const { name } = data
    const duplicate = await this.prisma.tourManager.findMany({
      where: { name },
    })

    if (duplicate.length > 0) {
      throw new ConflictException({ message: 'Tour manager already exists' })
    }
  }
}
