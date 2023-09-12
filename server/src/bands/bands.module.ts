import { BandsController } from './bands.controller'
import { BandsService } from './bands.service'
import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [BandsService],
  controllers: [BandsController],
  imports: [PrismaModule],
})
export class BandsModule {}
