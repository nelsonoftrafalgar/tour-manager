import { BandsModule } from './bands/bands.module'
import { ConcertsModule } from './concerts/concerts.module'
import { Module } from '@nestjs/common'
import { TourManagersModule } from './tourManagers/tourManagers.module'

@Module({
  imports: [TourManagersModule, BandsModule, ConcertsModule],
})
export class AppModule {}
