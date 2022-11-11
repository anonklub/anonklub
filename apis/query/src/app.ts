import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'

import { controllers } from '@controllers'
import { middlewares } from '@middlewares'

useContainer(Container)
export const app = createExpressServer({
  controllers,
  middlewares,
})
