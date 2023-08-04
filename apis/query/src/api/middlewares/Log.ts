import * as express from 'express'
import morgan from 'morgan'
import {
  ExpressMiddlewareInterface,
  Middleware,
} from 'routing-controllers-extended'
import { Service } from 'typedi'
import { logger } from '~/logger'

@Service()
@Middleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {
  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    return morgan(
      ':remote-addr :method :url :status :res[content-length] - :response-time ms',
      {
        stream: {
          // https://github.com/winstonjs/winston/issues/1591#issuecomment-555171620
          write: logger.http.bind(logger),
        },
      },
    )(req, res, next)
  }
}
