import { IdCheckerModule } from 'src/idChecker/idChecker.module'
import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TourManagersController } from './tourManagers.controller'
import { TourManagersService } from './tourManagers.service'

@Module({
  providers: [TourManagersService],
  controllers: [TourManagersController],
  imports: [PrismaModule, IdCheckerModule],
})
export class TourManagersModule {}
