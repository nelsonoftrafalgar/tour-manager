import { ConcertsController } from './concerts.controller'
import { ConcertsService } from './concerts.service'
import { IdCheckerModule } from 'src/idChecker/idChecker.module'
import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [ConcertsService],
  controllers: [ConcertsController],
  imports: [PrismaModule, IdCheckerModule],
})
export class ConcertsModule {}
