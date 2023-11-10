import { NestFactory } from '@nestjs/core'
import { AnonsetModule } from './app/anonset/anonset.module'

async function bootstrap() {
  const app = await NestFactory.create(AnonsetModule)
  await app.listen(3000)
}

void bootstrap()
