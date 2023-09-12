import { BandsModule } from './bands/bands.module'
import { Module } from '@nestjs/common'
import { TourManagersModule } from './tourManagers/tourManagers.module'

@Module({
  imports: [TourManagersModule, BandsModule],
})
export class AppModule {}
