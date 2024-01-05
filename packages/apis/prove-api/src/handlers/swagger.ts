import { RequestHandler } from 'express'
import { readFileSync } from 'fs'
import { join } from 'path'
import swaggerUi from 'swagger-ui-express'
import { parse } from 'yaml'

const openApiSpecYaml = readFileSync(
  join(__dirname, '..', '..', 'openapi.yaml'),
  'utf8',
)

export const swaggerRouter: RequestHandler = swaggerUi.setup(
  parse(openApiSpecYaml),
  {
    customfavIcon: '/favicon.ico',
    customSiteTitle: 'Proofs API',
  },
)
