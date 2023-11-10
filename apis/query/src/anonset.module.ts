import { Module } from '@nestjs/common'
import { AnonsetController } from './anonset.controller'
import { AnonsetService } from './anonset.service'
import {
  BigqueryClient,
  BigQueryRepository,
  DuneClient,
  DuneRepository,
  GraphRepository,
} from './repositories'

@Module({
  controllers: [AnonsetController],
  providers: [
    AnonsetService,
    BigQueryRepository,
    DuneRepository,
    GraphRepository,
    BigqueryClient,
    DuneClient,
  ],
})
export class AnonsetModule {}
