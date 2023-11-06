import { BandsController } from './bands.controller'
import { BandsService } from './bands.service'
import { IdCheckerModule } from 'src/idChecker/idChecker.module'
import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [BandsService],
  controllers: [BandsController],
  imports: [PrismaModule, IdCheckerModule],
})
export class BandsModule {}
