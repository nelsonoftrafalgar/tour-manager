import { IdCheckerService } from './IdChecker.service'
import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [IdCheckerService],
  imports: [PrismaModule],
})
export class IdCheckerModule {}
