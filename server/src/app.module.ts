import { BandsModule } from './bands/bands.module'
import { ConcertsModule } from './concerts/concerts.module'
import { Module } from '@nestjs/common'
import { SalariesModule } from './salaries/salaries.module'
import { TourManagersModule } from './tourManagers/tourManagers.module'

@Module({
  imports: [TourManagersModule, BandsModule, ConcertsModule, SalariesModule],
})
export class AppModule {}
