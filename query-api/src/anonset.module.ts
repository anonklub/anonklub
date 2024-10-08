import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { AnonsetController } from './anonset.controller'
import { AnonsetService } from './anonset.service'
import { BigqueryClient, BigQueryRepository, DuneClient, DuneRepository, GraphRepository } from './repositories'

const ONE_DAY = 60 * 60 * 24 * 1000

@Module({
  controllers: [AnonsetController],
  imports: [CacheModule.register({ ttl: ONE_DAY })],
  providers: [
    AnonsetService,
    BigQueryRepository,
    DuneRepository,
    GraphRepository,
    BigqueryClient,
    DuneClient,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AnonsetModule {}
