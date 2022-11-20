import { createExpressServer, useContainer } from 'routing-controllers-extended'
import { Container } from 'typedi'
import { controllers, middlewares } from './config'

useContainer(Container)
export const app = createExpressServer({
  controllers,
  middlewares,
})
