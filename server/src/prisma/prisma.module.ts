import { ConfigModule, ConfigService } from '@nestjs/config'

import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, ConfigService],
  exports: [PrismaService],
})
export class PrismaModule {}
