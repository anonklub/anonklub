import { Module } from '@nestjs/common'
import { AnonsetController } from './anonset.controller'
import { AnonsetService } from './anonset.service'

@Module({
  controllers: [AnonsetController],
  imports: [],
  providers: [AnonsetService],
})
export class AnonsetModule {}
