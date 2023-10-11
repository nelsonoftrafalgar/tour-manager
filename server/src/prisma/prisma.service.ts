import { Injectable, OnModuleInit } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super()
  }
  async onModuleInit() {
    if (this.shouldConnectToDatabase()) {
      await this.$connect()
    }
  }
  private shouldConnectToDatabase() {
    return this.configService.get('NODE_ENV') !== 'test'
  }
}
