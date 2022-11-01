import { createExpressServer } from 'routing-controllers'

import { controllers } from '@controllers'
import { middlewares } from '@middlewares'

export const app = createExpressServer({
  controllers,
  middlewares,
})
