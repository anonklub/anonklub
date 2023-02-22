import express from 'express'
import { readFileSync } from 'fs'
import { join } from 'path'
import { createExpressServer, useContainer } from 'routing-controllers-extended'
import { Container } from 'typedi'
import { parse } from 'yaml'
import swaggerUi from 'swagger-ui-express'
import { controllers, middlewares } from './config'

const openApiSpecYaml = readFileSync(
  join(__dirname, '..', 'openapi.yaml'),
  'utf8',
)

useContainer(Container)

const app = createExpressServer({
  controllers,
  cors: true,
  middlewares,
})

app.use(express.static('public'))
app.use('/', swaggerUi.serve)
app.get(
  '/',
  swaggerUi.setup(parse(openApiSpecYaml), {
    customfavIcon: '/favicon.ico',
    customSiteTitle: 'Anon Set API',
  }),
)

export { app }
