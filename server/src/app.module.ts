import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { TourManagersModule } from './tourManagers/tourManagers.module'

@Module({
  imports: [PrismaModule, TourManagersModule],
})
export class AppModule {}
