import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { join } from 'path'
import { AnonsetModule } from './anonset.module'

async function bootstrap() {
  // TODO: set more restrictive CORS policy
  const app = await NestFactory.create<NestExpressApplication>(AnonsetModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'debug'],
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(join(__dirname, '..', 'public'))

  SwaggerModule.setup(
    '',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Anonset API')
        .addServer('https://anonset.fly.dev', 'production')
        .addServer('https://anonset-staging.fly.dev', 'staging')
        .addServer('http://localhost:3000', 'local')
        .setContact(
          'Privacy Scaling Explorations',
          'https://pse.dev',
          'me@sripwoud.xyz',
        )
        .build(),
    ),
    {
      customfavIcon: 'favicon.ico',
      customSiteTitle: 'Anonset API',
    },
  )

  await app.listen(3000)
}

void bootstrap()
