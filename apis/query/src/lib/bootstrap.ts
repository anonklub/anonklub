import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'

import { controllers } from '@controllers'
import { middlewares } from '@middlewares'

export function bootstrap() {
  useContainer(Container)
  return createExpressServer({
    controllers,
    middlewares,
  })
}
