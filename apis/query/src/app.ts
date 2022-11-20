import path from 'path'

import { createExpressServer, useContainer } from 'routing-controllers-extended'
import { Container } from 'typedi'

useContainer(Container)
export const app = createExpressServer({
  controllers: [path.join(__dirname, 'api', '/controllers/*.ts')],
  middlewares: [path.join(__dirname, 'api', '/middlewares/*.ts')],
})
