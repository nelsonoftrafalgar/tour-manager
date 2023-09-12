import { ConcertsController } from './concerts.controller'
import { ConcertsService } from './concerts.service'
import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [ConcertsService],
  controllers: [ConcertsController],
  imports: [PrismaModule],
})
export class ConcertsModule {}
