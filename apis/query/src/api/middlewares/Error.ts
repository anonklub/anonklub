import * as express from 'express'
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers-extended'
import { Service } from 'typedi'
import { Logger, LoggerInterface } from '@decorators/Logger'

@Service()
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(@Logger() readonly logger: LoggerInterface) {}

  public error(
    error: HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void {
    this.logger.error(error.name, error)
  }
}
