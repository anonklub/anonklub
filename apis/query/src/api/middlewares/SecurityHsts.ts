import * as express from 'express'
import helmet from 'helmet'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { Service } from 'typedi'

@Service()
@Middleware({ type: 'before' })
export class SecurityHstsMiddleware implements ExpressMiddlewareInterface {
  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    return helmet.hsts()(req, res, next)
  }
}
