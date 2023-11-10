import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AnonsetModule } from './app/anonset/anonset.module'

async function bootstrap() {
  const app = await NestFactory.create(AnonsetModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

void bootstrap()
